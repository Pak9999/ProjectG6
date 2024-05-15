from django.db import models

class Continent(models.Model):
    continent_id = models.AutoField(primary_key=True)
    continent_name = models.CharField(max_length=30, db_column='continent_name')

    class Meta:
        managed = False
        db_table = 'continent'
        verbose_name = 'Continent'
        verbose_name_plural = 'Continents'
    
    def __str__(self):
        return self.continent_name

class Country(models.Model):
    country_id = models.AutoField(primary_key=True)
    country_name = models.CharField(max_length=40, db_column='country_name', unique=True)
    population = models.BigIntegerField(blank=True, null=True)
    land_area = models.IntegerField(blank=True, null=True)
    continent = models.ForeignKey(Continent, on_delete=models.CASCADE, db_column='continent_id', related_name='countries')

    class Meta:
        managed = False
        db_table = 'country'
        verbose_name = 'Country'
        verbose_name_plural = 'Countries'
    
    def __str__(self):
        return self.country_name

class Region(models.Model):
    region_id = models.AutoField(primary_key=True)
    region_name = models.CharField(max_length=60, db_column='region_name', unique=True)
    climate = models.CharField(max_length=40, blank=True, null=True)
    country = models.ForeignKey(Country, on_delete=models.CASCADE, db_column='country_id', related_name='regions')

    class Meta:
        managed = False
        db_table = 'region'
        verbose_name = 'Region'
        verbose_name_plural = 'Regions'
    
    def __str__(self):
        return self.region_name

class City(models.Model):
    city_id = models.AutoField(primary_key=True)
    city_name = models.CharField(max_length=60, db_column='city_name', unique=True)
    population = models.IntegerField(blank=True, null=True)
    climate = models.CharField(max_length=40, blank=True, null=True)
    region = models.ForeignKey(Region, on_delete=models.CASCADE, db_column='region_id', related_name='cities')

    class Meta:
        managed = False
        db_table = 'city'
        verbose_name = 'City'
        verbose_name_plural = 'Cities'
    
    def __str__(self):
        return self.city_name

class PointOfInterest(models.Model):
    poi_id = models.AutoField(primary_key=True)
    poi_name = models.CharField(max_length=60, unique=True)
    region = models.ForeignKey(
        Region, on_delete=models.CASCADE, blank=True, null=True, 
        db_column='in_region', related_name='pois_region'
    )
    city = models.ForeignKey(
        City, on_delete=models.CASCADE, blank=True, null=True, 
        db_column='in_city', related_name='pois_city'
    )

    class Meta:
        managed = False
        db_table = 'point_of_interest'
        verbose_name = 'Point of Interest'
        verbose_name_plural = 'Points of Interest'
        constraints = [
            models.CheckConstraint(
                check=models.Q(region__isnull=False, city__isnull=True) | models.Q(region__isnull=True, city__isnull=False),
                name='check_poi_region_city_exclusivity'
            )
        ]

    def __str__(self):
        return self.poi_name

class Tag(models.Model):
    tag_id = models.AutoField(primary_key=True)
    tag_name = models.CharField(max_length=20, unique=True)

    class Meta:
        managed = False
        db_table = 'tag'

    def __str__(self):
        return self.tag_name
    


class Article(models.Model):
    article_id = models.AutoField(primary_key=True)
    under_title = models.CharField(max_length=90)
    content = models.TextField()
    continent = models.ForeignKey(Continent, on_delete=models.SET_NULL, blank=True, null=True)
    country = models.ForeignKey(Country, on_delete=models.SET_NULL, blank=True, null=True)
    region = models.ForeignKey(Region, on_delete=models.SET_NULL, blank=True, null=True)
    city = models.ForeignKey(City, on_delete=models.SET_NULL, blank=True, null=True)
    poi = models.ForeignKey(PointOfInterest, on_delete=models.SET_NULL, blank=True, null=True)
    tag = models.ManyToManyField(Tag)


    class Meta:
        managed = False
        db_table = 'article'
        constraints = [
            models.CheckConstraint(
                check=models.Q(continent__isnull=False, country__isnull=True, region__isnull=True, city__isnull=True, poi__isnull=True) |
                    models.Q(continent__isnull=True, country__isnull=False, region__isnull=True, city__isnull=True, poi__isnull=True) |
                    models.Q(continent__isnull=True, country__isnull=True, region__isnull=False, city__isnull=True, poi__isnull=True) |
                    models.Q(continent__isnull=True, country__isnull=True, region__isnull=True, city__isnull=False, poi__isnull=True) |
                    models.Q(continent__isnull=True, country__isnull=True, region__isnull=True, city__isnull=True, poi__isnull=False),
                name='check_article_geographical_level_exclusivity'
            )
        ]

    def __str__(self):
        return f"{self.under_title}: {self.content[:50]}..."  # Display the title and part of the content
    

class PlacedImage(models.Model):
    image_id = models.AutoField(primary_key=True)
    article = models.ForeignKey(Article, on_delete=models.CASCADE, related_name='images')
    image_url = models.ImageField(upload_to='images/', null=True, blank=True)

    class Meta:
        managed = False
        db_table = 'placed_img'
        verbose_name = 'Placed Image'
        verbose_name_plural = 'Placed Images'

    def __str__(self):
        return f"Image for Article {self.article.article_id}"

#getting the ids of the geographical levels based on the parent id

def get_country_id_based_on_continent(continent_id):
    try:
        country = Country.objects.filter(continent_id=continent_id).first()
        if country:
            return country.country_id
    except Country.DoesNotExist:
        pass
    return None

def get_region_id_based_on_country(country_id):
    try:
        region = Region.objects.filter(country_id=country_id).first()
        if region:
            return region.region_id
    except Region.DoesNotExist:
        pass
    return None

def get_city_id_based_on_region(region_id):
    try:
        city = City.objects.filter(region_id=region_id).first()
        if city:
            return city.city_id
    except City.DoesNotExist:
        pass
    return None




