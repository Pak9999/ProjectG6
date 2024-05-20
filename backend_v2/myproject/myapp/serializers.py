# serializers.py
from rest_framework import serializers
from .models import *

class PlacedImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = PlacedImage
        fields = ['image_url']

class ArticleSerializer(serializers.ModelSerializer):
    images = PlacedImageSerializer(many=True, read_only=True)

    class Meta:
        model = Article
        fields = ['article_id', 'under_title', 'content', 'images']
        
class PointOfInterestSerializer(serializers.ModelSerializer):
    articles = ArticleSerializer(many=True, source='article_set', read_only=True)
    
    class Meta:
        model = PointOfInterest
        fields = ['poi_id', 'poi_name', 'articles']

class CitySerializer(serializers.ModelSerializer):
    pois_city = PointOfInterestSerializer(many=True, read_only=True)  # Ensure this matches the related_name
    articles = ArticleSerializer(many=True, source='article_set', read_only=True)
    
    class Meta:
        model = City
        fields = ['city_id', 'city_name', 'population', 'climate', 'pois_city', 'articles']  # 'pois_city' corresponds to related_name

class RegionSerializer(serializers.ModelSerializer):
    cities = CitySerializer(many=True, read_only=True)
    pois_region = PointOfInterestSerializer(many=True, read_only=True)  # Ensure this matches the related_name
    articles = ArticleSerializer(many=True, source='article_set', read_only=True)
    
    class Meta:
        model = Region
        fields = ['region_id', 'region_name', 'climate', 'cities', 'pois_region', 'articles']  # 'pois_region' corresponds to related_name


class CountrySerializer(serializers.ModelSerializer):
    regions = RegionSerializer(many=True, read_only=True)
    articles = ArticleSerializer(many=True, source='article_set', read_only=True)
    class Meta:
        model = Country
        fields = ['country_id', 'country_name', 'population', 'land_area', 'regions', 'articles']

class ContinentSerializer(serializers.ModelSerializer):
    countries = CountrySerializer(many=True, read_only=True)
    articles = ArticleSerializer(many=True, source='article_set', read_only=True)
    image_url = serializers.SerializerMethodField()

    class Meta:
        model = Continent
        fields = ['continent_id', 'continent_name', 'countries', 'articles', 'image_url']

    def get_image_url(self, obj):
        return obj.get_image_url()
