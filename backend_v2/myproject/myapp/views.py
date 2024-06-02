from django.shortcuts import render
from django.http import JsonResponse

from rest_framework import generics
from rest_framework.views import APIView
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.generics import RetrieveAPIView

from .models import *
from .serializers import *
from rest_framework.generics import RetrieveAPIView
from rest_framework.permissions import AllowAny
from django.db.models import Q
from rest_framework.generics import ListAPIView


class ContinentSearchAPIView(generics.ListAPIView):
    serializer_class = ContinentSerializer
    permission_classes = [AllowAny]
    serializer_class = ContinentSerializer
    permission_classes = [AllowAny]

    def get_queryset(self):
        query = self.request.query_params.get('q', None)
        if query:
            # Filter continents based on the query
            continents = Continent.objects.filter(
                Q(continent_name__icontains=query) |
                Q(countries__country_name__icontains=query) |
                Q(countries__regions__region_name__icontains=query) |
                Q(countries__regions__cities__city_name__icontains=query) |
                Q(countries__regions__cities__pois_city__poi_name__icontains=query) |
                Q(countries__regions__pois_region__poi_name__icontains=query)
            ).distinct()
            return continents
        return Continent.objects.none()

    def list(self, request, *args, **kwargs):
        queryset = self.get_queryset()
        data = []
        query = request.query_params.get('q', '')

        for continent in queryset:
            continent_data = {
                'continent_id': continent.continent_id,
                'continent_name': continent.continent_name,
                'countries': []
            }
            for country in continent.countries.all():
                country_data = {
                    'country_id': country.country_id,
                    'country_name': country.country_name,
                    'regions': []
                }
                for region in country.regions.all():
                    region_data = {
                        'region_id': region.region_id,
                        'region_name': region.region_name,
                        'cities': [],
                        'pois_region': []
                    }
                    for city in region.cities.all():
                        city_data = {
                            'city_id': city.city_id,
                            'city_name': city.city_name,
                            'pois_city': []
                        }
                        for poi in city.pois_city.filter(poi_name__icontains=query):
                            poi_data = {
                                'poi_id': poi.poi_id,
                                'poi_name': poi.poi_name,
                                'articles': [{'article_id': article.article_id, 'under_title': article.under_title, 'content': article.content} for article in poi.article_set.all()]  # Convert Article instances to dictionaries
                            }
                            city_data['pois_city'].append(poi_data)
                        if city_data['pois_city'] or city.city_name.lower().find(query.lower()) != -1:  # Check if city name or POI matches the query
                            region_data['cities'].append(city_data)
                    for poi in region.pois_region.filter(poi_name__icontains=query):
                        poi_data = {
                            'poi_id': poi.poi_id,
                            'poi_name': poi.poi_name,
                            'articles': [{'article_id': article.article_id, 'under_title': article.under_title, 'content': article.content} for article in poi.article_set.all()]  # Convert Article instances to dictionaries
                        }
                        region_data['pois_region'].append(poi_data)
                    if region_data['cities'] or region_data['pois_region'] or region.region_name.lower().find(query.lower()) != -1:  # Check if region name or POI matches the query
                        country_data['regions'].append(region_data)
                if country_data['regions'] or country.country_name.lower().find(query.lower()) != -1:  # Check if country name matches the query
                    continent_data['countries'].append(country_data)
            if continent_data['countries'] or continent.continent_name.lower().find(query.lower()) != -1:  # Check if continent name matches the query
                data.append(continent_data)
        return Response(data)



def continent_search_view(request):
    query = request.GET.get('q')
    continents = Continent.objects.filter(continent_name__icontains=query) if query else None
    return render(request, 'myapp/search_results.html', {'continents': continents, 'query': query})

class ArticleDetailAPIView(generics.RetrieveAPIView):
    '''
    Class-based view to retrieve a specific article.

    Attributes:
    - queryset: Queryset of all Article objects
    - serializer_class: Serializer object to convert queryset to JSON

    Usage:
    - GET request to /articles/<int:article_id>/ to retrieve a specific article

    Methods:
    - get: Retrieve a specific article and return it as a response
    '''   
    queryset = Article.objects.all()
    serializer_class = ArticleSerializer

class ArticleListAPIView(generics.ListAPIView):
    '''
    Class-based view to retrieve all articles.

    Attributes:
    - queryset: Queryset of all Article objects
    - serializer_class: Serializer object to convert queryset to JSON

    Usage:
    - GET request to /articles/ to retrieve all articles

    Methods:
    - get: Retrieve all articles and return them as a response    
    '''
    queryset = Article.objects.all()
    serializer_class = ArticleSerializer
    

class ContinentListAPIView(APIView):
    '''
    Class-based view to retrieve all continents.
    
    Attributes:
    - continents: Queryset of all Continent objects
    - serializer: Serializer object to convert queryset to JSON

    Usage:
    - GET request to /continents/ to retrieve all continents

    Methods:
    - get: Retrieve all continents and return them as a response
    '''
    def get(self, request):
        continents = Continent.objects.all()
        serializer = ContinentSerializer(continents, many=True)
        return Response(serializer.data)
    
    
class ContinentDetailAPIView(RetrieveAPIView):
    '''
    Class-based view to retrieve a specific continent.

    Attributes:
    - queryset: Queryset of all Continent objects
    - serializer_class: Serializer object to convert queryset to JSON
    - lookup_field: Field to use for filtering the queryset

    Usage:
    - GET request to /continents/<int:continent_id>/ to retrieve a specific continent

    Methods:
    - get: Retrieve a specific continent and return it as a response
    '''
    queryset = Continent.objects.all()
    serializer_class = ContinentSerializer
    lookup_field = 'continent_id' 


class CountryListAPIView(APIView):
    '''
    Class-based view to retrieve all countries.

    Attributes:
    - countries: Queryset of all Country objects
    - serializer: Serializer object to convert queryset to JSON

    Usage:
    - GET request to /countries/ to retrieve all countries

    Methods:
    - get: Retrieve all countries and return them as a response
    '''

    def get(self, request):
        countries = Country.objects.all() 
        serializer = CountrySerializer(countries, many=True)
        return Response(serializer.data)


class CountryDetailAPIView(RetrieveAPIView):
    '''
    Class-based view to retrieve a specific country.

    Attributes:
    - queryset: Queryset of all Country objects
    - serializer_class: Serializer object to convert queryset to JSON
    - lookup_field: Field to use for filtering the queryset

    Usage:
    - GET request to /countries/<int:country_id>/ to retrieve a specific country

    Methods:
    - get: Retrieve a specific country and return it as a response    
    '''
    queryset = Country.objects.all()
    serializer_class = CountrySerializer
    lookup_field = 'country_id'


class RegionListAPIView(APIView): 
    '''
    List all regions with their respective articles.

    Attributes:
    - regions: Queryset of all Region objects
    - serializer: Serializer object to convert queryset to JSON

    Usage:
    - GET request to /regions/ to retrieve all regions

    Methods:
    - get: Retrieve all regions and return them as a response    
    '''
    def get(self, request):
        regions = Region.objects.all()
        serializer = RegionSerializer(regions, many=True)
        return Response(serializer.data)


class RegionDetailAPIView(RetrieveAPIView):
    '''
    Retrieve a specific region with its articles.

    Attributes:
    - queryset: Queryset of all Region objects
    - serializer_class: Serializer object to convert queryset to JSON
    - lookup_field: Field to use for filtering the queryset

    Usage:
    - GET request to /regions/<int:region_id>/ to retrieve a specific region

    Methods:
    - get: Retrieve a specific region and return it as a response    
    '''
    queryset = Region.objects.all()
    serializer_class = RegionSerializer
    lookup_field = 'region_id'


class CityListAPIView(APIView):
    '''
    List all cities with their respective articles.

    Attributes:
    - cities: Queryset of all City objects
    - serializer: Serializer object to convert queryset to JSON

    Usage:
    - GET request to /cities/ to retrieve all cities

    Methods:
    - get: Retrieve all cities and return them as a response
    '''
    def get(self, request):
        cities = City.objects.all() 
        serializer = CitySerializer(cities, many=True)
        return Response(serializer.data)  
    

class CityDetailAPIView(RetrieveAPIView):
    '''
    Retrieve a specific city with its articles.

    Attributes:
    - queryset: Queryset of all City objects
    - serializer_class: Serializer object to convert queryset to JSON
    - lookup_field: Field to use for filtering the queryset

    Usage:
    - GET request to /cities/<int:city_id>/ to retrieve a specific city

    Methods:
    - get: Retrieve a specific city and return it as a response
    '''
    queryset = City.objects.all()
    serializer_class = CitySerializer
    lookup_field = 'city_id'


class PointOfInterestListAPIView(APIView):
    '''
    List all points of interest.

    Attributes:
    - points_of_interest: Queryset of all PointOfInterest objects
    - serializer: Serializer object to convert queryset to JSON

    Usage:
    - GET request to /points_of_interest/ to retrieve all points of interest

    Methods:
    - get: Retrieve all points of interest and return them as a response    
    '''
    def get(self, request):
        points_of_interest = PointOfInterest.objects.all()
        serializer = PointOfInterestSerializer(points_of_interest, many=True)
        return Response(serializer.data)
    

class PointOfInterestDetailAPIView(RetrieveAPIView):
    '''
    Retrieve a specific point of interest with its articles.

    Attributes:
    - queryset: Queryset of all PointOfInterest objects
    - serializer_class: Serializer object to convert queryset to JSON
    - lookup_field: Field to use for filtering the queryset

    Usage:
    - GET request to /points_of_interest/<int:poi_id>/ to retrieve a specific point of interest

    Methods:
    - get: Retrieve a specific point of interest and return it as a response
    ''' 
    queryset = PointOfInterest.objects.all()
    serializer_class = PointOfInterestSerializer
    lookup_field = 'poi_id'




#Views used in article form

def get_continents(request):
    '''
    Function to get all continents from the database for the dropdown menu.
    Attributes:
    - continents: Queryset of all Continent objects
    - continent_data: List of dictionaries containing the ID and name of each continent
    Usage:
    - GET request to /ajax/get_continents/ to retrieve all continents
    Returns:
    - JsonResponse: JSON response containing the list of continents
    '''
    continents = Continent.objects.all()
    continent_data = [{'id': continent.continent_id, 'name': continent.continent_name} for continent in continents]
    return JsonResponse({'continents': continent_data})

def get_countries_for_continent(request):
    '''
    Function to get all countries for a specific continent for the dropdown menu.
    Attributes:
    - continent_id: ID of the selected continent
    - countries: Queryset of all Country objects filtered by continent_id
    - country_data: List of dictionaries containing the ID and name of each country
    Usage:
    - GET request to /ajax/get_countries_for_continent/?continent_id=<continent_id> to retrieve all countries for a specific continent
    Returns:
    - JsonResponse: JSON response containing the list of countries
    '''
    continent_id = request.GET.get('continent_id')
    countries = Country.objects.filter(continent_id=continent_id).values('country_id', 'country_name')
    return JsonResponse(list(countries), safe=False)

def get_regions_for_country(request):
    '''
    Function to get all regions for a specific country for the dropdown menu.
    Attributes:
    - country_id: ID of the selected country
    - regions: Queryset of all Region objects filtered by country_id
    - region_data: List of dictionaries containing the ID and name of each region
    Usage:
    - GET request to /ajax/get_regions_for_country/?country_id=<country_id> to retrieve all regions for a specific country
    Returns:
    - JsonResponse: JSON response containing the list of regions
    '''
    country_id = request.GET.get('country_id')
    regions = Region.objects.filter(country_id=country_id).values('region_id', 'region_name')
    return JsonResponse(list(regions), safe=False)

def get_cities_for_region(request):
    '''
    Function to get all cities for a specific region for the dropdown menu.
    Attributes:
    - region_id: ID of the selected region
    - cities: Queryset of all City objects filtered by region_id
    - city_data: List of dictionaries containing the ID and name of each city
    Usage:
    - GET request to /ajax/get_cities_for_region/?region_id=<region_id> to retrieve all cities for a specific region
    Returns:
    - JsonResponse: JSON response containing the list of cities
    '''
    region_id = request.GET.get('region_id')
    cities = City.objects.filter(region_id=region_id).values('city_id', 'city_name')
    return JsonResponse(list(cities), safe=False)

def get_pois_for_city(request):
    '''
    Function to get all points of interest for a specific city for the dropdown menu.
    Attributes:
    - city_id: ID of the selected city
    - pois: Queryset of all PointOfInterest objects filtered by city_id
    - poi_data: List of dictionaries containing the ID and name of each point of interest
    Usage:
    - GET request to /ajax/get_pois_for_city/?city_id=<city_id> to retrieve all points of interest for a specific city
    Returns:
    - JsonResponse: JSON response containing the list of points of interest
    '''
    city_id = request.GET.get('city_id')
    region_id = request.GET.get('region_id')

    if city_id:
        pois = PointOfInterest.objects.filter(city_id=city_id).values('poi_id', 'poi_name')
    elif region_id:
        pois = PointOfInterest.objects.filter(region_id=region_id).values('poi_id', 'poi_name')
    else:
        pois = []

    return JsonResponse(list(pois), safe=False)



# Functions used in the article form to get the ID of the country, region and city based on the selected continent, country and region
def get_country_id_for_continent(request):
    '''
    Function to get the ID of the country based on the selected continent calling the model function get_country_id_based_on_continent.
    Attributes:
    - continent_id: ID of the selected continent
    - country_id: ID of the country based on the selected continent
    Usage:
    - GET request to /ajax/get_country_id_for_continent/?continent_id=<continent_id> to retrieve the ID of the country based on the selected continent
    Returns:
    - JsonResponse: JSON response containing the ID of the country
    '''
    continent_id = request.GET.get('continent_id')
    country_id = get_country_id_based_on_continent(continent_id)
    return JsonResponse({'country_id': country_id})

def get_region_id_for_country(request):
    '''
    Function to get the ID of the region based on the selected country calling the model function get_region_id_based_on_country.
    Attributes:
    - country_id: ID of the selected country
    - region_id: ID of the region based on the selected country
    Usage:
    - GET request to /ajax/get_region_id_for_country/?country_id=<country_id> to retrieve the ID of the region based on the selected country
    Returns:
    - JsonResponse: JSON response containing the ID of the region
    '''
    country_id = request.GET.get('country_id')
    region_id = get_region_id_based_on_country(country_id)
    return JsonResponse({'region_id': region_id})

def get_city_id_for_region(request):
    '''
    Function to get the ID of the city based on the selected region calling the model function get_city_id_based_on_region.
    Attributes:
    - region_id: ID of the selected region
    - city_id: ID of the city based on the selected region
    Usage:
    - GET request to /ajax/get_city_id_for_region/?region_id=<region_id> to retrieve the ID of the city based on the selected region
    Returns:
    - JsonResponse: JSON response containing the ID of the city
    '''
    region_id = request.GET.get('region_id')
    city_id = get_city_id_based_on_region(region_id)
    return JsonResponse({'city_id': city_id})

# This function handles the search functionality for continents

""" def get_regions_for_country(request):
    country_id = request.GET.get('country_id')
    regions = Region.objects.filter(country_id=country_id).values('region_id', 'region_name')
    return JsonResponse(list(regions), safe=False)

def get_cities_for_region(request):
    region_id = request.GET.get('region_id')
    cities = City.objects.filter(region_id=region_id).values('city_id', 'city_name')
    return JsonResponse(list(cities), safe=False)

def get_pois_for_city(request):
    city_id = request.GET.get('city_id')
    pois = PointOfInterest.objects.filter(city_id=city_id).values('poi_id', 'poi_name')
    return JsonResponse(list(pois), safe=False) """