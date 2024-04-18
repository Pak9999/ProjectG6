from django.urls import path
from . import views
from .views import get_countries_for_continent

urlpatterns = [
    path('', views.list_continents, name='list_continents'),
    path('continent/<int:continent_id>/', views.continent_detail, name='continent_detail'),
    path('country/<int:country_id>/', views.country_detail, name='country_detail'),
    path('region/<int:region_id>/', views.region_detail, name='region_detail'),
    path('city/<int:city_id>/', views.city_detail, name='city_detail'),
    path('poi/<int:poi_id>/', views.poi_detail, name='poi_detail'),
    path('ajax/get_countries_for_continent/', get_countries_for_continent, name='get_countries_for_continent'),


]


