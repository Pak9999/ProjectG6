from django import forms
from django.db import transaction
from .models import Article, Continent, Country, Region, City, PointOfInterest, PlacedImage



class ArticleForm(forms.ModelForm):
    '''
    Used to create articles. The form includes fields for the Article model and related models (geo level) to be stored in the 
    database in two different tables, article and geo level ('continent', 'country', 'region', 'city' or 'point of interest').

    Attributes:
    - parent_id: Hidden input field to store the primary key of the parent model (Continent, Country, Region, City)
    - chosen_continent: ModelChoiceField to select a continent
    - chosen_country: ModelChoiceField to select a country
    - chosen_region: ModelChoiceField to select a region
    - chosen_city: ModelChoiceField to select a city
    - image: ImageField to upload an image

    Usage:
    form = ArticleForm(request.POST, request.FILES)
    if form.is_valid():
        form.save()

    Methods:
    - __init__: Initializes the form with custom field labels, placeholders, and field order
    - clean: Validates the population and land area fields
    - save: Saves the Article instance and related models to the database using a single transaction
    '''
    POI_PARENT_CHOICES = [
        ('', '--- Select Parent Type ---'),
        ('region', 'Region'),
        ('city', 'City')
    ]
    parent_id = forms.IntegerField(required=False, widget=forms.HiddenInput())
    chosen_continent = forms.ModelChoiceField(queryset=Continent.objects.all(), label="Vald Kontinent", empty_label="Välj Kontinent", required=False)
    chosen_country = forms.ModelChoiceField(queryset=Country.objects.all(), label="Vald Land", empty_label= "-", required=False)
    chosen_region = forms.ModelChoiceField(queryset=Region.objects.all(), label="Vald Region", empty_label= "-", required=False)
    chosen_city = forms.ModelChoiceField(queryset=City.objects.all(), label="Vald Stad", empty_label= "-", required=False)
    image = forms.ImageField(required=False, label="Image")  # Add image field

    class Meta:
        model = Article
        fields = ['chosen_continent', 'chosen_country', 'chosen_region', 'chosen_city', 'chosen_poi', 'image']

    place_name = forms.CharField(required=False, label="Titel och namn på ny artikel")
    population = forms.IntegerField(required=False, label="Befolkningsantal")
    land_area = forms.IntegerField(required=False, label="Yta i km2")
    climate = forms.CharField(required=False, label="Klimat")
    poi_parent_type = forms.ChoiceField(choices=[
        ('', '--- För sevärdhet ---'),
        ('region', 'Region'),
        ('city', 'Stad')
    ], required=False, label="POI Parent Type")

    class Meta:
        model = Article
        fields = ['place_name', 'under_title', 'content', 'population', 'land_area', 'climate', 'poi_parent_type', 'image']

    def __init__(self, *args, **kwargs):
        '''
        Defines the form fields, labels, placeholders, and field order

        Args:
        - args: Positional arguments
        - kwargs: Keyword arguments
        '''
        super(ArticleForm, self).__init__(*args, **kwargs)
        
        self.fields['under_title'].label = "Underrubrik"
        self.fields['content'].label = "Brödtext"
        
        self.fields['place_name'].widget.attrs['placeholder'] = "Ange platsnamn här"
        self.fields['under_title'].widget.attrs['placeholder'] = "Ange en underrubrik här"
        self.fields['content'].widget.attrs['placeholder'] = "Skriv huvudinnehållet här"
        self.fields['population'].widget.attrs['placeholder'] = "För land och stad"
        self.fields['land_area'].widget.attrs['placeholder'] = "För land"
        self.fields['climate'].widget.attrs['placeholder'] = "För region och stad"
        self.fields['poi_parent_type'].widget.attrs['placeholder'] = "För sevärdhet"

        field_order = ['place_name', 'under_title', 'content', 'geographical_level', 'population', 'land_area', 'climate', 'poi_parent_type', 'image']
        self.order_fields(field_order)
        
        if 'chosen_country' in self.data:
            try:
                country_id = int(self.data.get('chosen_country'))
                self.fields['chosen_region'].queryset = Region.objects.filter(country_id=country_id)
            except (ValueError, TypeError):
                pass
        elif self.instance.pk:
            self.fields['chosen_region'].queryset = self.instance.country.region_set
            
        elif 'chosen_region' in self.data:
            try:
                region_id = int(self.data.get('chosen_region'))
                self.fields['chosen_city'].queryset = City.objects.filter(region_id=region_id)
            except (ValueError, TypeError):
                self.fields['chosen_city'].queryset = City.objects.none()
        elif self.instance.pk and self.instance.region:
            self.fields['chosen_city'].queryset = self.instance.region.city_set
        else:
            self.fields['chosen_city'].queryset = City.objects.none()

    def clean(self):
        '''
        Validates the population and land area fields and returns cleaned data

        Returns:
        - cleaned_data: Dictionary containing cleaned data
        
        '''
        cleaned_data = super().clean()
        population = cleaned_data.get('population')
        land_area = self.cleaned_data.get('land_area')
        if land_area is not None:
            land_area = int(land_area)
        if population is not None:
            try:
                population = int(population)
            except ValueError:
                raise forms.ValidationError("Population must be a valid integer.")

        if land_area is not None:
            try:
                land_area = int(land_area)
            except ValueError:
                raise forms.ValidationError("Land area must be a valid integer.")

        return cleaned_data

    def save(self, commit=True):
        '''
        Saves the Article instance and related models to the database using a single transaction
        include values for both article and related models (geo level)

        Args:
        - commit: Boolean value to determine whether to commit the instance to the database

        Returns:
        - instance: Article instance saved to the database
        '''
        instance = super().save(commit=False) 
        place_name = self.cleaned_data.get('place_name')
        chosen_continent = self.cleaned_data.get('chosen_continent')
        chosen_country = self.cleaned_data.get('chosen_country')
        
        chosen_parent_type = self.cleaned_data.get('poi_parent_type')
        chosen_region = self.cleaned_data.get('chosen_region')
        chosen_city = self.cleaned_data.get('chosen_city')
        climate = self.cleaned_data.get('climate')
        
        population = self.cleaned_data.get('population')
        if population is not None:
            population = int(population)
        else:
            population = 0 
            
        land_area = self.cleaned_data.get('land_area')
        if land_area is not None:
            try:
                land_area = int(land_area)
            except ValueError:
                land_area = 0  
        else:
            land_area = 0  

        print(f"population: {population}, land_area: {land_area}")

        with transaction.atomic(): 
            
            if chosen_parent_type == 'region' and chosen_region:   
                poi = PointOfInterest.objects.create(
                    poi_name=place_name,
                    region = chosen_region,
                    city = None
                )
                instance.poi = poi
                instance.parent_id = chosen_region.pk
                
                poi.save()
                    
            elif chosen_parent_type == 'city' and chosen_city:
                poi = PointOfInterest.objects.create(
                    poi_name=place_name,
                    city = chosen_city,
                    region = None
                )
                instance.poi = poi
                instance.parent_id = chosen_city.pk
                
                poi.save()
            
                
            elif chosen_region and place_name:
                city = City.objects.create(
                    city_name=place_name,
                    climate=climate,
                    region=chosen_region
                )
                instance.city = city
                instance.parent_id = chosen_region.pk
                chosen_city = city  

                if population is not None:
                    city.population = population
                city.save()  
                
            elif chosen_country and place_name:
                region = Region.objects.create(
                    region_name=place_name,
                    climate=climate,
                    country=chosen_country
                )
                instance.region = region
                instance.parent_id = chosen_country.pk
                chosen_region = region 

                if climate is not None:
                    chosen_region.climate = climate
                region.save()
                
                
            elif chosen_continent:
                country, created = Country.objects.get_or_create(
                    country_name = place_name,
                    continent = chosen_continent
                )
                if population is not None:
                    country.population = population
                if land_area is not None:
                    country.land_area = land_area
                country.save() 
                instance.country = country
                instance.parent_id = chosen_continent.pk

            instance.save()

            self.save_m2m()
            
            if self.cleaned_data.get('image'):
                image = self.cleaned_data['image']
                PlacedImage.objects.create(article=instance, image_url=image)

        return instance
