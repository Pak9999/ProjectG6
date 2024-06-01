from django import forms
from django.db import transaction
from .models import Article, Continent, Country, Region, City, PointOfInterest, PlacedImage

class ArticleForm(forms.ModelForm):
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
        super(ArticleForm, self).__init__(*args, **kwargs)
        
        # Custom labels
        self.fields['under_title'].label = "Underrubrik"
        self.fields['content'].label = "Brödtext"
        
        # Custom placeholders
        self.fields['place_name'].widget.attrs['placeholder'] = "Ange platsnamn här"
        self.fields['under_title'].widget.attrs['placeholder'] = "Ange en underrubrik här"
        self.fields['content'].widget.attrs['placeholder'] = "Skriv huvudinnehållet här"
        self.fields['population'].widget.attrs['placeholder'] = "För land och stad"
        self.fields['land_area'].widget.attrs['placeholder'] = "För land"
        self.fields['climate'].widget.attrs['placeholder'] = "För region och stad"
        self.fields['poi_parent_type'].widget.attrs['placeholder'] = "För sevärdhet"

        # Preserve custom field order
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
        cleaned_data = super().clean()
        population = cleaned_data.get('population')
        land_area = self.cleaned_data.get('land_area')
        if land_area is not None:
            land_area = int(land_area)
        # Validate population and land area
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
        instance = super().save(commit=False)  # Create the Article instance without committing to the database
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
            population = 0  # Or any other default value you prefer
            
        land_area = self.cleaned_data.get('land_area')
        if land_area is not None:
            try:
                land_area = int(land_area)
            except ValueError:
                land_area = 0  # Set default value if land_area cannot be converted to an integer
        else:
            land_area = 0  # Set default value if land_area is None

        print(f"population: {population}, land_area: {land_area}")

        with transaction.atomic():  # Ensures all operations are done within a single transaction
            
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
                # creates a new city if it does not exist
                city = City.objects.create(
                    city_name=place_name,
                    climate=climate,
                    region=chosen_region
                )
                instance.city = city
                instance.parent_id = chosen_region.pk
                chosen_city = city  # Update chosen_region for city creation

                # Update population if available
                if population is not None:
                    city.population = population
                city.save()  # Save the region with updated population
                
            elif chosen_country and place_name:
                # creates a new region if it does not exist
                region = Region.objects.create(
                    region_name=place_name,
                    climate=climate,
                    country=chosen_country
                )
                instance.region = region
                instance.parent_id = chosen_country.pk
                chosen_region = region  # Update chosen_region for city creation

                # Update population and land area if available
                if climate is not None:
                    chosen_region.climate = climate
                region.save()  # Save the region with updated climate
                
                
            elif chosen_continent:
                # creates a new country if it does not exist
                country, created = Country.objects.get_or_create(
                    country_name = place_name,
                    continent = chosen_continent
                )
                # Set population and land area if available
                if population is not None:
                    country.population = population
                if land_area is not None:
                    country.land_area = land_area
                country.save()  # Save the country with updated population and land area
                instance.country = country
                instance.parent_id = chosen_continent.pk  # Set the parent_id to the continent's primary key

            instance.save()  # Save the Article instance to the database

            # Save many-to-many data if applicable
            self.save_m2m()
            
            # Handle the image
            if self.cleaned_data.get('image'):
                image = self.cleaned_data['image']
                PlacedImage.objects.create(article=instance, image_url=image)

        return instance
