from django import forms
from django.db import transaction
from .models import Article, Continent, Country, Region, City, PointOfInterest

class ArticleForm(forms.ModelForm):
    POI_PARENT_CHOICES = [
        ('', '--- Select Parent Type ---'),
        ('region', 'Region'),
        ('city', 'City')
    ]

    geographical_level = forms.ChoiceField(choices=[
        ('continent', 'Kontinent'),
        ('country', 'Land'),
        ('region', 'Region'),
        ('city', 'Stad'),
        ('point_of_interest', 'Sevärdhet')
    ], label="Geografisk nivå")
    place_name = forms.CharField(required=False, label="Platsnamn")
    parent_id = forms.IntegerField(required=False, label="Parent ID")
    population = forms.IntegerField(required=False, label="Befolkningsantal")
    land_area = forms.IntegerField(required=False, label="Yta")
    climate = forms.CharField(required=False, label="Klimat")
    poi_parent_type = forms.ChoiceField(choices=[
        ('', '--- För sevärdhet ---'),   #TODO CHECK RELEVANCY TO POI_PARENT_CHOICE
        ('region', 'Region'),
        ('city', 'Stad')
    ], required=False, label="POI Parent Type")

    class Meta:
        model = Article
        fields = ['place_name', 'under_title', 'content', 'geographical_level', 'parent_id', 'population', 'land_area', 'climate', 'poi_parent_type']

    def __init__(self, *args, **kwargs):
        super(ArticleForm, self).__init__(*args, **kwargs)
        
        # Custom labels
        self.fields['under_title'].label = "Underrubrik"
        self.fields['content'].label = "Brödtext"
        
        # Custom placeholders
        self.fields['place_name'].widget.attrs['placeholder'] = "Ange platsnamn här"
        self.fields['under_title'].widget.attrs['placeholder'] = "Ange en underrubrik här"
        self.fields['content'].widget.attrs['placeholder'] = "Skriv huvudinnehållet här"
        self.fields['parent_id'].widget.attrs['placeholder'] = "Sverige = 14, skapa region"
        self.fields['population'].widget.attrs['placeholder'] = "För land och stad"
        self.fields['land_area'].widget.attrs['placeholder'] = "För land"
        self.fields['climate'].widget.attrs['placeholder'] = "För region och stad"
        self.fields['poi_parent_type'].widget.attrs['placeholder'] = "För sevärdhet"

        # Preserve custom field order
        field_order = ['place_name', 'under_title', 'content', 'geographical_level', 'parent_id', 'population', 'land_area', 'climate', 'poi_parent_type']
        self.order_fields(field_order)

    def clean(self):
        cleaned_data = super().clean()
        geo_level = cleaned_data.get('geographical_level')

        # Validate and clean data based on geographical level
        if geo_level not in ['country', 'city']:
            cleaned_data['population'] = None
        if geo_level != 'country':
            cleaned_data['land_area'] = None
        if geo_level not in ['region', 'city']:
            cleaned_data['climate'] = None
        if geo_level != 'point_of_interest':
            cleaned_data['poi_parent_type'] = None

        return cleaned_data

    def save(self, commit=True):
        instance = super().save(commit=False)  # Create the Article instance without committing to the database
        geo_level = self.cleaned_data.get('geographical_level')
        parent_id = self.cleaned_data.get('parent_id')
        place_name = self.cleaned_data.get('place_name')

        with transaction.atomic():  # Ensures all operations are done within a single transaction
            if geo_level == 'continent':
                continent, created = Continent.objects.get_or_create(
                    continent_name=place_name
                )
                instance.continent = continent
            elif geo_level == 'country':
                country, created = Country.objects.get_or_create(
                    country_name=place_name,
                    defaults={
                        'continent_id': parent_id,
                        'population': self.cleaned_data.get('population'),
                        'land_area': self.cleaned_data.get('land_area')
                    }
                )
                instance.country = country
            elif geo_level == 'region':
                region, created = Region.objects.get_or_create(
                    region_name=place_name,
                    defaults={
                        'country_id': parent_id,
                        'climate': self.cleaned_data.get('climate')
                    }
                )
                instance.region = region
            elif geo_level == 'city':
                city, created = City.objects.get_or_create(
                    city_name=place_name,
                    defaults={
                        'region_id': parent_id,
                        'population': self.cleaned_data.get('population'),
                        'climate': self.cleaned_data.get('climate')
                    }
                )
                instance.city = city
            elif geo_level == 'point_of_interest':
                poi_parent_type = self.cleaned_data.get('poi_parent_type')
                if poi_parent_type == 'region':
                    point_of_interest, created = PointOfInterest.objects.get_or_create(
                        poi_name=place_name,
                        defaults={'region_id': parent_id}
                    )
                elif poi_parent_type == 'city':
                    point_of_interest, created = PointOfInterest.objects.get_or_create(
                        poi_name=place_name,
                        defaults={'city_id': parent_id}
                    )
                instance.poi = point_of_interest

            if commit:
                instance.save()  # Now save the Article instance to the database
                self.save_m2m()  # Save many-to-many data if applicable

        return instance
    





class DynamicArticleForm(forms.ModelForm):
    # Start with only the continent field visible.
    chosen_continent = forms.ModelChoiceField(queryset=Continent.objects.all(), empty_label="Choose Continent", required=False)
    # Other fields will be initialized as empty and hidden, to be populated via AJAX.

    class Meta:
        model = Article
        fields = ['chosen_continent']  # Start with only the continent field.