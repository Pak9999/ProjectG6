from django.db import models


#Class definitions for the models of the database

class Continent(models.Model):
    '''
    Continent model handling the values of the 'continent' table in the database.

    Attributes:
    - continent_id: AutoField, primary key
    - continent_name: CharField, max length 30, column name 'continent_name'

    Meta:
    - managed: False
    - db_table: 'continent'
    - verbose_name: 'Continent'
    - verbose_name_plural: 'Continents'

    Methods:
    - __str__: Returns the name of the continent
    - get_image_url: Returns the URL of the first image found in the related articles
    '''
    continent_id = models.AutoField(primary_key=True)
    continent_name = models.CharField(max_length=30, db_column='continent_name')

    class Meta:
        managed = False
        db_table = 'continent'
        verbose_name = 'Continent'
        verbose_name_plural = 'Continents'
    
    def __str__(self):
        '''
        Function to return the name of the continent
        Args:
        - self: Continent object
        Returns:
        - str: Name of the continent
        '''
        return self.continent_name
    
    def get_image_url(self):
        '''
        Function to get the image url of the specific continent
        Args:
        - self: Continent object
        Returns:
        - str: URL of the first image found in the related articles
        '''
        articles = self.article_set.all()
        for article in articles:
            if article.images.exists():
                return article.images.first().image_url.url
        return None

class Country(models.Model):
    '''
    Country model handling the values of the 'country' table in the database.

    Attributes:
    - country_id: AutoField, primary key
    - country_name: CharField, max length 40, column name 'country_name'
    - population: BigIntegerField, blank and null allowed
    - land_area: IntegerField, blank and null allowed
    - continent: ForeignKey to Continent, on_delete CASCADE, column name 'continent_id', related name 'countries'

    Meta:
    - managed: False
    - db_table: 'country'
    - verbose_name: 'Country'
    - verbose_name_plural: 'Countries'

    Methods:
    - __str__: Returns the name of the country
    '''
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
        '''
        Function to return the name of the country
        Args:
        - self: Country object
        Returns:
        - str: Name of the country
        '''
        return self.country_name

class Region(models.Model):
    '''
    Region model handling the values of the 'region' table in the database.

    Attributes:
    - region_id: AutoField, primary key
    - region_name: CharField, max length 60, column name 'region_name'
    - climate: CharField, max length 40, blank and null allowed
    - country: ForeignKey to Country, on_delete CASCADE, column name 'country_id', related name 'regions'

    Meta:
    - managed: False
    - db_table: 'region'
    - verbose_name: 'Region'
    - verbose_name_plural: 'Regions'

    Methods:
    - __str__: Returns the name of the region
    '''
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
        '''
        Function to return the name of the region
        Args:
        - self: Region object
        Returns:
        - str: Name of the region
        '''
        return self.region_name

class City(models.Model):
    '''
    City model handling the values of the 'city' table in the database.

    Attributes:
    - city_id: AutoField, primary key
    - city_name: CharField, max length 60, column name 'city_name'
    - population: IntegerField, blank and null allowed
    - climate: CharField, max length 40, blank and null allowed
    - region: ForeignKey to Region, on_delete CASCADE, column name 'region_id', related name 'cities'

    Meta:
    - managed: False
    - db_table: 'city'
    - verbose_name: 'City'
    - verbose_name_plural: 'Cities'

    Methods:
    - __str__: Returns the name of the city
    '''
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
        '''
        Function to return the name of the city
        Args:
        - self: City object
        Returns:
        - str: Name of the city
        '''
        return self.city_name

class PointOfInterest(models.Model):
    '''
    Point of Interest model handling the values of the 'point_of_interest' table in the database.

    Attributes:
    - poi_id: AutoField, primary key
    - poi_name: CharField, max length 60, unique
    - region: ForeignKey to Region, on_delete CASCADE, blank and null allowed, column name 'in_region', related name 'pois_region'
    - city: ForeignKey to City, on_delete CASCADE, blank and null allowed, column name 'in_city', related name 'pois_city'

    Meta:
    - managed: False
    - db_table: 'point_of_interest'
    - verbose_name: 'Point of Interest'
    - verbose_name_plural: 'Points of Interest'
    - constraints: CheckConstraint to ensure that the Point of Interest is either in a region or a city, but not both

    Methods:
    - __str__: Returns the name of the Point of Interest
    '''
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
        '''
        Function to return the name of the Point of Interest
        Args:
        - self: PointOfInterest object
        Returns:
        - str: Name of the Point of Interest
        '''
        return self.poi_name


class Article(models.Model):
    '''
    Article model handling the values of the 'article' table in the database.

    Attributes:
    - article_id: AutoField, primary key
    - under_title: CharField, max length 90
    - content: TextField
    - continent: ForeignKey to Continent, on_delete SET_NULL, blank and null allowed
    - country: ForeignKey to Country, on_delete SET_NULL, blank and null allowed
    - region: ForeignKey to Region, on_delete SET_NULL, blank and null allowed
    - city: ForeignKey to City, on_delete SET_NULL, blank and null allowed
    - poi: ForeignKey to PointOfInterest, on_delete SET_NULL, blank and null allowed

    Meta:
    - managed: False
    - db_table: 'article'
    - constraints: CheckConstraint to ensure that the article is related to only one geographical level

    Methods:
    - __str__: Returns the title and part of the content of the article
    '''
    article_id = models.AutoField(primary_key=True)
    under_title = models.CharField(max_length=90)
    content = models.TextField()
    continent = models.ForeignKey(Continent, on_delete=models.SET_NULL, blank=True, null=True)
    country = models.ForeignKey(Country, on_delete=models.SET_NULL, blank=True, null=True)
    region = models.ForeignKey(Region, on_delete=models.SET_NULL, blank=True, null=True)
    city = models.ForeignKey(City, on_delete=models.SET_NULL, blank=True, null=True)
    poi = models.ForeignKey(PointOfInterest, on_delete=models.SET_NULL, blank=True, null=True)


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
        '''
        Function to return the title and part of the content of the article
        Args:
        - self: Article object
        Returns:
        - str: Title and part of the content of the article
        '''
        return f"{self.under_title}: {self.content[:50]}..." 
    

class PlacedImage(models.Model):
    '''
    Image model handling the values of the 'placed_img' table in the database. This model is used to store the 
    path to images in file repository related to the articles.

    Attributes:
    - image_id: AutoField, primary key
    - article: ForeignKey to Article, on_delete CASCADE, related name 'images'
    - image_url: ImageField, upload to 'images/', blank and null allowed

    Meta:
    - managed: False
    - db_table: 'placed_img'
    - verbose_name: 'Placed Image'
    - verbose_name_plural: 'Placed Images'

    Methods:
    - __str__: Returns the article id of the image
    '''
    image_id = models.AutoField(primary_key=True)
    article = models.ForeignKey(Article, on_delete=models.CASCADE, related_name='images')
    image_url = models.ImageField(upload_to='images/', null=True, blank=True)

    class Meta:
        managed = False
        db_table = 'placed_img'
        verbose_name = 'Placed Image'
        verbose_name_plural = 'Placed Images'

    def __str__(self):
        '''
        Function to return the article id of the image
        Args:
        - self: PlacedImage object
        Returns:
        - str: Image for Article {article_id}
        '''
        return f"Image for Article {self.article.article_id}"



# Functions to handle the retrieval of IDs for use in the article creation form

def get_country_id_based_on_continent(continent_id):
    '''
    Handles the retrieval of the country id based on the continent id for use in the article creation form.
    Args:
    - continent_id: int, the id of the continent
    Returns:
    - int: the id of the country
    '''
    try:
        country = Country.objects.filter(continent_id=continent_id).first()
        if country:
            return country.country_id
    except Country.DoesNotExist:
        pass
    return None

def get_region_id_based_on_country(country_id):
    '''
    Handles the retrieval of the region id based on the country id for use in the article creation form.
    Args:
    - country_id: int, the id of the country
    Returns:
    - int: the id of the region
    '''
    try:
        region = Region.objects.filter(country_id=country_id).first()
        if region:
            return region.region_id
    except Region.DoesNotExist:
        pass
    return None

def get_city_id_based_on_region(region_id):
    '''
    Handles the retrieval of the city id based on the region id for use in the article creation form.
    Args:
    - region_id: int, the id of the region
    Returns:
    - int: the id of the city
    '''
    try:
        city = City.objects.filter(region_id=region_id).first()
        if city:
            return city.city_id
    except City.DoesNotExist:
        pass
    return None




