
---------------CREATE TABLES----------------

create table continent (
	continent_id serial primary key,
	continent_name varchar (30) not null
);

create table country (
	country_id serial primary key,
	country_name varchar (40) not null, 
	population bigint,
	land_area int,
	continent_id int references continent(continent_id)
);

create table region (
	region_id serial primary key,
	region_name varchar (60) not null,
	climate varchar (40),
	country_id int references country(country_id)
);

create table city (
	city_id serial primary key,
	city_name varchar (60) not null,
	population int,
	climate varchar (40),
	region_id int references region(region_id)
);

create table capital (
	city_id int references city(city_id),
	country_id int references country(country_id),
	primary key (city_id, country_id)
);

create table region_capital (
	city_id int references city(city_id),
	region_id int references region(region_id),
	primary key (city_id, region_id)
);

insert into capital 
values (3, 8)

select * from capital 

create table point_of_interest (
	poi_id serial primary key,
	poi_name varchar (60) not null,
	in_region int references region(region_id),
	in_city int references city(city_id),
	check (
        (in_region is not NULL and in_city is NULL)
        or
        (in_region is NULL and in_city is not NULL)
    )
);

create table language_table (
	language_id serial primary key,
	language_name varchar (60) not null
);

create table language_in_country (
	country_id int references country(country_id),
	language_id int references language_table(language_id),
	primary key (country_id, language_id)
);

select * from article

update article 
set content = 'Europe, a continent defined by its rich historical tapestry and diverse cultural heritage, is bordered by the Arctic Ocean to the north, the Atlantic Ocean to the west, and the Mediterranean Sea to the south. Its eastern boundary, stretching from the Ural Mountains to the Bosporus, marks the continental divide between Europe and Asia. Europe’s allure isn’t just in its landscapes but also in its vibrant cities and the remnants of its tumultuous history.

Spanning a relatively small area, Europe boasts an astonishing variety of climates, from the temperate forested lands of Central Europe to the icy tundras of Scandinavia and the warm Mediterranean shores. This geographical diversity has fostered a similarly diverse array of lifestyles and traditions in the population.

Europe is often viewed as the cradle of Western civilization, with its roots going back to ancient Greece, where democracy, philosophy, and scientific inquiry first flourished. The Roman Empire subsequently spread these ideas across Europe, laying the groundwork for modern governance, law, and culture. The Middle Ages saw the rise of powerful monarchies and the church, which played a significant role in shaping modern Europe through the Renaissance and the Reformation.

The continent is renowned for its role in the artistic and intellectual history of the world. Europe was the birthplace of many of the great periods of art, including the Renaissance and the Baroque, which produced figures like Michelangelo, Leonardo da Vinci, and Rembrandt. European literature has had a profound impact globally, with authors such as Shakespeare, Cervantes, and Tolstoy.

Modern Europe is known for its political and economic structures, notably the European Union (EU), which seeks to foster economic cooperation and ensure political stability among its member nations. The euro, used by 19 of the 27 member countries, is one of the world’s most significant currencies.

European cuisine reflects the continent’s cultural diversity, with each country offering its own unique dishes and culinary techniques. From the rich pastries of Austria to the hearty stews of Hungary and the sophisticated sauces of France, European cuisine is a major aspect of its cultural identity.

Europe also makes substantial contributions to the global economy, particularly through its automotive, manufacturing, and technology sectors. Education and innovation are highly valued, with numerous ancient universities and modern facilities pushing forward scientific research.

Tourism is another vital industry, drawing visitors to historic cities like Paris, Berlin, and Rome, as well as to its scenic rural areas and vibrant cultural festivals. With a plethora of UNESCO World Heritage sites, Europe remains one of the most popular tourist destinations worldwide.

In sports, Europe is at the forefront, hosting events like the UEFA Champions League and being home to many of the world’s most famous football clubs. The continent also excels in a variety of other sports, including tennis, cycling, and skiing.

Europe’s complex and layered history, coupled with its ongoing influence in global affairs, continues to fascinate and inspire. It remains a continent of timeless appeal, celebrated for its artistic achievements, historical landmarks, and broad socioeconomic contributions to the world.

//ChatGPT-4'
where article_id = 1;

CREATE TABLE article (
    article_id serial primary key,
    under_title varchar(90) not null,
    content TEXT not null,
    continent_id INT NULL REFERENCES continent(continent_id),
    country_id INT NULL REFERENCES country(country_id),
    region_id INT NULL REFERENCES region(region_id),
    city_id INT NULL REFERENCES city(city_id),
    poi_id INT NULL REFERENCES point_of_interest(poi_id),
    CHECK (
        (continent_id IS NOT NULL AND country_id IS NULL AND region_id IS NULL AND city_id IS NULL AND poi_id IS NULL) OR
        (continent_id IS NULL AND country_id IS NOT NULL AND region_id IS NULL AND city_id IS NULL AND poi_id IS NULL) OR
        (continent_id IS NULL AND country_id IS NULL AND region_id IS NOT NULL AND city_id IS NULL AND poi_id IS NULL) OR
        (continent_id IS NULL AND country_id IS NULL AND region_id IS NULL AND city_id IS NOT NULL AND poi_id IS NULL) OR
        (continent_id IS NULL AND country_id IS NULL AND region_id IS NULL AND city_id IS NULL AND poi_id IS NOT NULL)
    )
);

create table tag (
	tag_id serial primary key,
	tag_name varchar (20)
);

create table article_tag (
	article_id int references article(article_id),
	tag_id int references tag(tag_id),
	primary key (article_id, tag_id)
);


create table img_dump (
	img_id serial primary key,
	img_name varchar(40),
	img_url bytea
)

create table placed_img (
	img_id int references img_dump(img_id),
	article_id int references article(article_id),
	primary key (img_id, article_id)
)

---------------GENERIC INSERTS----------------

insert into continent (continent_name)
values
    ('Afrika'),
    ('Antarktis'),
    ('Asien'),
    ('Nordamerika'),
    ('Oceanien'),
    ('Sydamerika');


---------------CREATE FUNCTIONS----------------

create or replace function insert_article_with_geo_data(
    p_place_name varchar,
    p_under_title varchar,
    p_content text,
    p_geographical_level varchar,
    p_population bigint default null,
    p_land_area int default null,
    p_climate varchar default null,
    p_parent_id int default null,
    p_poi_parent_type varchar default null -- New parameter to specify if the POI's parent is a region or a city
) returns void as $$
declare
    v_place_id int;
begin
    case p_geographical_level
        when 'continent' then
            begin
                insert into continent (continent_name) values (p_place_name) returning continent_id into v_place_id;
                raise notice 'Inserted new continent: % with id %', p_place_name, v_place_id;
            exception when unique_violation then
                select continent_id into v_place_id from continent where continent_name = p_place_name;
                raise notice 'Continent already exists: %', p_place_name;
            end;
        when 'country' then
            begin
                insert into country (country_name, population, land_area, continent_id)
                values (p_place_name, p_population, p_land_area, p_parent_id) returning country_id into v_place_id;
                raise notice 'Inserted new country: % with id %', p_place_name, v_place_id;
            exception when unique_violation then
                raise exception 'Country with name "%" already exists.', p_place_name;
            end;
        when 'region' then
            begin
                insert into region (region_name, climate, country_id)
                values (p_place_name, p_climate, p_parent_id) returning region_id into v_place_id;
                raise notice 'Inserted new region: % with id %', p_place_name, v_place_id;
            exception when unique_violation then
                select region_id into v_place_id from region where region_name = p_place_name;
                raise notice 'Region already exists: %', p_place_name;
            end;
        when 'city' then
            begin
                insert into city (city_name, population, climate, region_id)
                values (p_place_name, p_population, p_climate, p_parent_id) returning city_id into v_place_id;
                raise notice 'Inserted new city: % with id %', p_place_name, v_place_id;
            exception when unique_violation then
                select city_id into v_place_id from city where city_name = p_place_name;
                raise notice 'City already exists: %', p_place_name;
            end;
        when 'point_of_interest' then
            if p_poi_parent_type = 'region' then
                insert into point_of_interest (poi_name, in_region, in_city)
                values (p_place_name, p_parent_id, null) returning poi_id into v_place_id;
                raise notice 'Inserted new point of interest (Region) with id %', v_place_id;
            elsif p_poi_parent_type = 'city' then
                insert into point_of_interest (poi_name, in_region, in_city)
                values (p_place_name, null, p_parent_id) returning poi_id into v_place_id;
                raise notice 'Inserted new point of interest (City) with id %', v_place_id;
            else
                raise exception 'Invalid POI parent type: %', p_poi_parent_type;
            end if;
        else
            raise exception 'Invalid geographical level: %', p_geographical_level;
    end case;

    -- Insert the article with the correct reference based on the geographical level
    insert into article (under_title, content, continent_id, country_id, region_id, city_id, poi_id)
    values (
        p_under_title,
        p_content,
        case when p_geographical_level = 'continent' then v_place_id else null end,
        case when p_geographical_level = 'country' then v_place_id else null end,
        case when p_geographical_level = 'region' then v_place_id else null end,
        case when p_geographical_level = 'city' then v_place_id else null end,
        case when p_geographical_level = 'point_of_interest' then v_place_id else null end
    );
    raise notice 'Article inserted for %', p_place_name;
exception
    when others then
        raise;
end;
$$ language plpgsql;



--funktion för att mata in data--

SELECT insert_article_with_geo_data(
    'Etna', -- Place name
    'Europas högsta aktiva vulkan', -- Under_title
    'Etna, eller ”Muncibeddu” som berget heter på sicilianska, har varit mer eller mindre aktiv i 500 000 år.', -- Content
    'point_of_interest', -- Geographical level
    NULL, -- Population
    NULL, -- Land area
    NULL, -- Climate (region and city)
    10, -- ID of parent
	'region' -- Geo level of parent (city or region for POI)
);

select * from point_of_interest 

insert into tag (tag_name)
values ('Kultur') -- Adding tags

insert into article_tag (article_id, tag_id)
values (19, 2)   -- Adding tags to articles


---------------CREATE VIEWS----------------

--view for showing country + article
create or replace view full_country_article as 
select a.article_id, c.country_id, c.country_name, a.under_title, c.population, c.land_area, k.continent_name, a.content, STRING_AGG(t.tag_name, ', ') AS tags
from country c
join continent k
on c.continent_id = k.continent_id
join article a
on c.country_id = a.country_id
join article_tag x 
on a.article_id = x.article_id
join tag t 
on t.tag_id = x.tag_id
GROUP BY a.article_id, c.country_id, k.continent_name, a.under_title, a.content; 

--filtering countries by country name
select * from full_country_article
where country_name = 'Tyskland'

--filtering countries by continent name
select * from full_country_article 
where continent_name = 'Asien'

--view for showing continent + article
create or replace view full_continent_article as
select a.article_id, k.continent_id, k.continent_name, a.under_title, a.content
from continent k 
join article a
on k.continent_id = a.continent_id

--filtering contintent by continent name
select * from full_continent_article
where continent_name = 'Afrika'

--view for showing region + article
create or replace view full_region_article as
select a.article_id, r.region_id, r.region_name, a.under_title, r.climate, a.content, c.country_name
from region r 
join article a 
on r.region_id = a.region_id
join country c
on r.country_id = c.country_id

--filtering region by region name
select * from full_region_article
where region_name = 'Skåne'

--filtering region by country name
select * from full_region_article
where country_name = 'Sverige'

--view for showing city + article
create or replace view full_city_article as
select a.article_id, ci.city_id, ci.city_name, a.under_title, ci.population, ci.climate, a.content, r.region_name, c.country_name
from city ci
join article a 
on ci.city_id = a.city_id
join region r
on r.region_id = ci.region_id
join country c
on c.country_id = r.country_id

--filtering city by region name
select * from full_city_article
where region_name = 'Skåne'

--filtering city by city name
select * from full_city_article 
where city_name = 'Malmö'

--filtering city by country namn
select * from full_city_article
where country_name = 'Sverige'

--view for showing poi + article
create or replace view full_poi_article as
select a.article_id, p.poi_id, p.poi_name, a.under_title, coalesce(r.region_name, ci.city_name) as location_name, a.content
from point_of_interest p
left join article a on p.poi_id = a.poi_id
left join region r on p.in_region = r.region_id
left join city ci on p.in_city = ci.city_id;


--filtering poi by location name
select * from full_poi_article
where location_name = 'Malmö'

--filtering poi by poi name
select * from full_poi_article
where poi_name = 'Malmöhus slott'


select * from region

delete from article where article_id = 34



