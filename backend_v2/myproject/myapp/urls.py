from django.urls import path
from . import views
from .views import *
from . import views
from django.conf import settings
from django.conf.urls.static import static


urlpatterns = [
    path('api/articles/<int:pk>/', views.ArticleDetailAPIView.as_view(), name='article-detail'),
    path('api/articles/', ArticleListAPIView.as_view(), name='article-list'),
    
    path('api/continents/', ContinentListAPIView.as_view(), name='continent-list'),
    path('api/continents/<int:continent_id>/', views.ContinentDetailAPIView.as_view(), name='continent-detail'),

    path('api/countries/', CountryListAPIView.as_view(), name='country-list'),
    path('api/countries/<int:country_id>/', views.CountryDetailAPIView.as_view(), name='country-detail'),


    path('api/regions/', RegionListAPIView.as_view(), name='region-list'),
    path('api/regions/<int:region_id>/', views.RegionDetailAPIView.as_view(), name='region-detail'),

    path('api/cities/', CityListAPIView.as_view(), name='city-list'),
    path('api/cities/<int:city_id>/', views.CityDetailAPIView.as_view(), name='city-detail'),

    path('api/PointsOfInterest/', PointOfInterestListAPIView.as_view(), name='point-of-interest-list'),
    path('api/PointsOfInterest/<int:poi_id>/', views.PointOfInterestDetailAPIView.as_view(), name='poi-detail'),


    path('', views.list_continents, name='list_continents'),
    path('continent/<int:continent_id>/', views.continent_detail, name='continent_detail'),
    path('country/<int:country_id>/', views.country_detail, name='country_detail'),
    path('region/<int:region_id>/', views.region_detail, name='region_detail'),
    path('city/<int:city_id>/', views.city_detail, name='city_detail'),
    path('poi/<int:poi_id>/', views.poi_detail, name='poi_detail'),
    
    path('ajax/get_continents/', get_continents, name='get_continents'),
    path('ajax/get_countries_for_continent/', get_countries_for_continent, name='get_countries_for_continent'),
    path('ajax/get_regions_for_country/', get_regions_for_country, name='get_regions_for_country'),
    path('ajax/get_cities_for_region/', get_cities_for_region, name='get_cities_for_region'),
    path('ajax/get_pois_for_city/', get_pois_for_city, name='get_pois_for_city'),
    path('ajax/get_country_id_for_continent/', views.get_country_id_for_continent, name='get_country_id_for_continent'),
    path('ajax/get_region_id_for_country/', views.get_region_id_for_country, name='get_region_id_for_country'),
    path('ajax/get_city_id_for_region/', views.get_city_id_for_region, name='get_city_id_for_region'),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)


