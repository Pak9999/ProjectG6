from rest_framework import serializers
from .models import *





class PlacedImageSerializer(serializers.ModelSerializer):
    '''
    Serializer for PlacedImage model
    Fields:
    - image_url: URL of the image
    '''
    class Meta:
        model = PlacedImage
        fields = ['image_url']

class ArticleSerializer(serializers.ModelSerializer):
    '''
    Serializer for Article model
    Fields:
    - article_id: ID of the article
    - under_title: Under title of the article
    '''
    images = PlacedImageSerializer(many=True, read_only=True)

    class Meta:
        model = Article
        fields = ['article_id', 'under_title', 'content', 'images']
        
class PointOfInterestSerializer(serializers.ModelSerializer):
    '''
    Serializer for PointOfInterest model
    Fields:
    - poi_id: ID of the point of interest
    - poi_name: Name of the point of interest
    '''
    articles = ArticleSerializer(many=True, source='article_set', read_only=True)
    
    class Meta:
        model = PointOfInterest
        fields = ['poi_id', 'poi_name', 'articles']

class CitySerializer(serializers.ModelSerializer):
    '''
    Serializer for City model
    Fields:
    - city_id: ID of the city
    - city_name: Name of the city
    - population: Population of the city
    - climate: Climate of the city
    - pois_city: Point of interests in the city
    - articles: Articles about the city
    '''
    pois_city = PointOfInterestSerializer(many=True, read_only=True) 
    articles = ArticleSerializer(many=True, source='article_set', read_only=True)
    
    class Meta:
        model = City
        fields = ['city_id', 'city_name', 'population', 'climate', 'pois_city', 'articles']

class RegionSerializer(serializers.ModelSerializer):
    '''
    Serializer for Region model
    Fields:
    - region_id: ID of the region
    - region_name: Name of the region
    - climate: Climate of the region
    - cities: Cities in the region
    - pois_region: Point of interests in the region
    - articles: Articles about the region
    '''
    cities = CitySerializer(many=True, read_only=True)
    pois_region = PointOfInterestSerializer(many=True, read_only=True)
    articles = ArticleSerializer(many=True, source='article_set', read_only=True)
    
    class Meta:
        model = Region
        fields = ['region_id', 'region_name', 'climate', 'cities', 'pois_region', 'articles']


class CountrySerializer(serializers.ModelSerializer):
    '''
    Serializer for Country model
    Fields:
    - country_id: ID of the country
    - country_name: Name of the country
    - population: Population of the country
    - land_area: Land area of the country
    - regions: Regions in the country
    - articles: Articles about the country
    '''
    regions = RegionSerializer(many=True, read_only=True)
    articles = ArticleSerializer(many=True, source='article_set', read_only=True)
    class Meta:
        model = Country
        fields = ['country_id', 'country_name', 'population', 'land_area', 'regions', 'articles']

class ContinentSerializer(serializers.ModelSerializer):
    '''
    Serializer for Continent model
    Fields:
    - continent_id: ID of the continent
    - continent_name: Name of the continent
    - countries: Countries in the continent
    - articles: Articles about the continent
    - image_url: URL of the image
    '''
    countries = CountrySerializer(many=True, read_only=True)
    articles = ArticleSerializer(many=True, source='article_set', read_only=True)
    image_url = serializers.SerializerMethodField()

    class Meta:
        model = Continent
        fields = ['continent_id', 'continent_name', 'countries', 'articles', 'image_url']

    def get_image_url(self, obj):
        return obj.get_image_url()
