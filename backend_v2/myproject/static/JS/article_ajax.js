$(document).ready(function() {
    // Disable all dropdowns initially
    $('#id_chosen_country, #id_chosen_region, #id_chosen_city, #id_chosen_poi, #id_poi_parent_type').prop('disabled', true);

    // Event handler for changes in city or region dropdowns
    $('#id_chosen_city, #id_chosen_region').change(function() {
        var cityId = $('#id_chosen_city').val();
        var regionId = $('#id_chosen_region').val();

        // Check if there is a valid city or region selected
        if (cityId || regionId) {
            $('#id_chosen_poi, #id_poi_parent_type').prop('disabled', false).val('');
        } else {
            $('#id_chosen_poi, #id_poi_parent_type').prop('disabled', true).val('');
        }
    });

    // Continent change handler
    $('#id_chosen_continent').change(function() {
        console.log('Continent selection changed');
        var continentId = $(this).val();
        if (continentId) {
            $.ajax({
                url: '/ajax/get_countries_for_continent/',
                data: {
                    'continent_id': continentId
                },
                dataType: 'json',
                success: function(data) {
                    console.log('Country data received:', data);
                    $('#id_chosen_country').empty().append($('<option>').text('Choose Country').attr('value', ''));
                    $.each(data, function(index, country) {
                        $('#id_chosen_country').append($('<option>').text(country.country_name).attr('value', country.country_id));
                    });
                    $('#id_chosen_country').prop('disabled', false);
                    $('#id_chosen_region, #id_chosen_city, #id_chosen_poi').empty().prop('disabled', true);
                },
                error: function(xhr, status, error) {
                    console.error(xhr.responseText);
                }
            });
        } else {
            $('#id_chosen_country, #id_chosen_region, #id_chosen_city, #id_chosen_poi').empty().prop('disabled', true);
        }
    });

    // Country change handler
    $('#id_chosen_country').change(function() {
        console.log('Country selection changed');
        var countryId = $(this).val();
        if (countryId) {
            $.ajax({
                url: '/ajax/get_regions_for_country/',
                data: {
                    'country_id': countryId
                },
                dataType: 'json',
                success: function(data) {
                    console.log('Region data received:', data);
                    $('#id_chosen_region').empty().append($('<option>').text('Choose Region').attr('value', ''));
                    $.each(data, function(index, region) {
                        $('#id_chosen_region').append($('<option>').text(region.region_name).attr('value', region.region_id));
                    });
                    $('#id_chosen_region').prop('disabled', false);
                    $('#id_chosen_city, #id_chosen_poi').empty().prop('disabled', true);
                },
                error: function(xhr, status, error) {
                    console.error(xhr.responseText);
                }
            });
        } else {
            $('#id_chosen_region, #id_chosen_city, #id_chosen_poi').empty().prop('disabled', true);
        }
    });

    // Region change handler
    $('#id_chosen_region').change(function() {
        console.log('Region selection changed');
        var regionId = $(this).val();
        if (regionId) {
            $.ajax({
                url: '/ajax/get_cities_for_region/',
                data: {
                    'region_id': regionId
                },
                dataType: 'json',
                success: function(data) {
                    console.log('City data received:', data);
                    $('#id_chosen_city').empty().append($('<option>').text('Choose City').attr('value', ''));
                    $.each(data, function(index, city) {
                        $('#id_chosen_city').append($('<option>').text(city.city_name).attr('value', city.city_id));
                    });
                    $('#id_chosen_city').prop('disabled', false);
                    $('#id_chosen_poi').empty().prop('disabled', true);
                },
                error: function(xhr, status, error) {
                    console.error(xhr.responseText);
                }
            });
        } else {
            $('#id_chosen_city').empty().prop('disabled', true);
            $('#id_chosen_poi').prop('disabled', true); // Disable POI dropdown if no valid region
        }
    });

    // City and Region change handler to populate POIs
    $('#id_chosen_city, #id_chosen_region').change(function() {
        var cityId = $('#id_chosen_city').val();
        var regionId = $('#id_chosen_region').val();

        if (cityId || regionId) {
            $.ajax({
                url: '/ajax/get_pois_for_city/',
                data: { city_id: cityId, region_id: regionId },
                dataType: 'json',
                success: function(data) {
                    console.log('POI data received:', data);
                    $('#id_chosen_poi').empty().append($('<option>').text('Choose Point of Interest').attr('value', ''));
                    $.each(data, function(index, poi) {
                        $('#id_chosen_poi').append($('<option>').text(poi.poi_name).attr('value', poi.poi_id));
                    });
                    $('#id_chosen_poi').prop('disabled', false);
                },
                error: function(xhr, status, error) {
                    console.error(xhr.responseText);
                    $('#id_chosen_poi').prop('disabled', true);
                }
            });
        } else {
            $('#id_chosen_poi').empty().prop('disabled', true);
        }
    });
});