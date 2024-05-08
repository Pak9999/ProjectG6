# serializers.py
from rest_framework import serializers
from .models import *

class ArticleSerializer(serializers.ModelSerializer):
    class Meta:
        model = Article
        fields = ['article_id', 'under_title', 'content', 'continent', 'country', 'region', 'city', 'poi', 'tag']

class ContinentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Continent
        fields = ['continent_id', 'continent_name']

class CountrySerializer(serializers.ModelSerializer):
    class Meta:
        model = Country
        fields = ['country_id', 'country_name', 'population', 'land_area', 'continent_id']  

class RegionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Region
        fields = ['region_id', 'region_name', 'climate', 'country']

class CitySerializer(serializers.ModelSerializer):
    class Meta:
        model = City
        fields = ['city_id', 'city_name', 'population', 'climate', 'region_id']
        
class PointOfInterestSerializer(serializers.ModelSerializer):
    class Meta:
        model = PointOfInterest
        fields = ['poi_id', 'poi_name', 'in_region', 'in_city']