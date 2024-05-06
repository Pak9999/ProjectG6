from django.urls import path
from . import views
from .views import *
from . import views



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
    path('ajax/get_countries_for_continent/', get_countries_for_continent, name='get_countries_for_continent'),
]


