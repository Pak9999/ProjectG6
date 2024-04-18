from django.shortcuts import render
from .models import Continent, Country

from django.db import connection

def continent_data(request):
    # Execute raw SQL query to fetch data from the view
    with connection.cursor() as cursor:
        cursor.execute("SELECT * FROM full_continent_article")
        articles = cursor.fetchall()

    headers = ['Article ID', 'Continent ID', 'Continent Name', 'Under Title', 'Content']
    return render(request, 'myapp/continent_data.html', {'articles': articles, 'headers': headers})


def list_continents(request):
    continents = Continent.objects.all()
    return render(request, 'myapp/list_continents.html', {'continents': continents})


def continent_detail(request, continent_id):
    with connection.cursor() as cursor:
        cursor.execute("SELECT * FROM full_continent_article WHERE continent_id = %s", [continent_id])
        article = cursor.fetchone()

        # Optional: Fetch countries in the continent, if not already done
        cursor.execute("SELECT country_id, country_name FROM country WHERE continent_id = %s", [continent_id])
        countries = cursor.fetchall()

    return render(request, 'myapp/continent_detail.html', {
        'article': article,
        'countries': countries,
        'continent_id': continent_id
    })


def country_detail(request, country_id):
    with connection.cursor() as cursor:
        cursor.execute("""
            SELECT a.article_id, c.country_id, c.country_name, a.under_title, c.population, c.land_area, k.continent_id, k.continent_name, a.content
            FROM country c
            JOIN article a ON c.country_id = a.country_id
            JOIN continent k ON c.continent_id = k.continent_id
            WHERE c.country_id = %s
        """, [country_id])
        article = cursor.fetchone()

        # Fetch regions within the country
        cursor.execute("SELECT region_id, region_name FROM region WHERE country_id = %s", [country_id])
        regions = cursor.fetchall()

    return render(request, 'myapp/country_detail.html', {
        'article': article,
        'regions': regions,
        'country_id': country_id,
        'continent_id': article[6] if article else None  # Accessing continent_id safely
    })


def region_detail(request, region_id):
    with connection.cursor() as cursor:
        # Fetch the region's detailed article along with country and continent details
        cursor.execute("""
            SELECT a.article_id, r.region_id, r.region_name, a.under_title, r.climate, a.content, 
                c.country_id, c.country_name, k.continent_id, k.continent_name
            FROM region r 
            JOIN article a ON r.region_id = a.region_id
            JOIN country c ON c.country_id = r.country_id
            JOIN continent k ON c.continent_id = k.continent_id
            WHERE r.region_id = %s
        """, [region_id])
        article = cursor.fetchone()

        # Fetch cities within the region
        cursor.execute("SELECT city_id, city_name FROM city WHERE region_id = %s", [region_id])
        cities = cursor.fetchall()

        # Fetch Points of Interest related to the region
        cursor.execute("SELECT poi_id, poi_name FROM point_of_interest WHERE in_region = %s", [region_id])
        pois = cursor.fetchall()

    return render(request, 'myapp/region_detail.html', {
        'article': article,
        'cities': cities,
        'pois': pois,
        'region_id': region_id,
        'country_id': article[6] if article else None,
        'continent_id': article[8] if article else None,
        'continent_name': article[9] if article else None
    })




def city_detail(request, city_id):
    with connection.cursor() as cursor:
        cursor.execute("""
            SELECT a.article_id, ci.city_id, ci.city_name, a.under_title, ci.population, ci.climate, a.content, r.region_id, r.region_name, c.country_id, c.country_name, k.continent_id, k.continent_name
            FROM city ci
            JOIN article a ON ci.city_id = a.city_id
            JOIN region r ON r.region_id = ci.region_id
            JOIN country c ON c.country_id = r.country_id
            JOIN continent k ON c.continent_id = k.continent_id
            WHERE ci.city_id = %s
        """, [city_id])
        article = cursor.fetchone()

        # Fetch Points of Interest related to the city
        cursor.execute("SELECT poi_id, poi_name FROM point_of_interest WHERE in_city = %s", [city_id])
        pois = cursor.fetchall()

    return render(request, 'myapp/city_detail.html', {
        'article': article,
        'pois': pois,
        'city_id': city_id,
        'region_id': article[7],  # Assuming index for region_id
        'region_name': article[8],  # Assuming index for region_name
        'country_id': article[9],  # Assuming index for country_id
        'country_name': article[10],  # Assuming index for country_name
        'continent_id': article[11],  # Assuming index for continent_id
        'continent_name': article[12]  # Assuming index for continent_name
    })


def poi_detail(request, poi_id):
    with connection.cursor() as cursor:
        cursor.execute("""
            SELECT a.article_id, p.poi_id, p.poi_name, a.under_title,
                ci.city_name, r.region_name, a.content,
                ci.city_id, r.region_id,
                c.country_id, c.country_name,
                k.continent_id, k.continent_name
            FROM point_of_interest p
            LEFT JOIN article a ON p.poi_id = a.poi_id
            LEFT JOIN city ci ON p.in_city = ci.city_id
            LEFT JOIN region r ON (ci.region_id = r.region_id OR p.in_region = r.region_id)
            LEFT JOIN country c ON r.country_id = c.country_id
            LEFT JOIN continent k ON c.continent_id = k.continent_id
            WHERE p.poi_id = %s
        """, [poi_id])
        article = cursor.fetchone()

    return render(request, 'myapp/poi_detail.html', {
        'article': article,
        'poi_id': poi_id,
        'city_id': article[7],
        'city_name': article[4],
        'region_id': article[8],
        'region_name': article[5],
        'country_id': article[9],
        'continent_id': article[11]
    })






from django.http import JsonResponse

def get_countries_for_continent(request):
    continent_id = request.GET.get('continent_id')
    countries = Country.objects.filter(continent_id=continent_id).values('id', 'name')
    return JsonResponse(list(countries), safe=False)