$(document).ready(function() {
    // Define a function to populate countries based on the selected continent
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
                    // Clear the country dropdown first
                    $('#id_chosen_country').empty();
                    // Append a default option
                    $('#id_chosen_country').append($('<option>').text('Choose Country').attr('value', ''));
                    // Populate the country dropdown
                    $.each(data, function(index, country) {
                        console.log('Appending country:', country);
                        $('#id_chosen_country').append($('<option>').text(country.country_name).attr('value', country.country_id));
                    });
                    // Clear the region dropdown
                    $('#id_chosen_region').empty();
                    // Append a default option
                    $('#id_chosen_region').append($('<option>').text('Choose Region').attr('value', ''));
                },
                error: function(xhr, status, error) {
                    // Handle errors
                    console.error(xhr.responseText);
                }
            });
        } else {
            // Clear both country and region dropdowns if continent is not selected
            $('#id_chosen_country').empty();
            $('#id_chosen_region').empty();
        }
    });

    // Define a function to populate regions based on the selected country
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
                    // Clear the region dropdown first
                    $('#id_chosen_region').empty();
                    // Append a default option
                    $('#id_chosen_region').append($('<option>').text('Choose Region').attr('value', ''));
                    // Populate the region dropdown
                    $.each(data, function(index, region) {
                        console.log('Appending region:', region);
                        $('#id_chosen_region').append($('<option>').text(region.region_name).attr('value', region.region_id));
                    });
                },
                error: function(xhr, status, error) {
                    // Handle errors
                    console.error(xhr.responseText);
                }
            });
        } else {
            // Clear the region dropdown if no country is selected
            $('#id_chosen_region').empty();
        }
    });

    // Define a function to populate cities based on the selected region
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
                    // Clear the city dropdown first
                    $('#id_chosen_city').empty();
                    // Append a default option
                    $('#id_chosen_city').append($('<option>').text('Choose City').attr('value', ''));
                    // Populate the city dropdown
                    $.each(data, function(index, city) {
                        console.log('Appending city:', city);
                        $('#id_chosen_city').append($('<option>').text(city.city_name).attr('value', city.city_id));
                    });
                },
                error: function(xhr, status, error) {
                    // Handle errors
                    console.error(xhr.responseText);
                }
            });
        } else {
            // Clear the city dropdown if no region is selected
            $('#id_chosen_city').empty();
        }
    });

    // Define a function to populate points of interest based on the selected city or region
    $('#id_chosen_city, #id_chosen_region').change(function() {
        console.log('City or region selection changed');
        var cityId = $('#id_chosen_city').val();
        var regionId = $('#id_chosen_region').val();

        var requestData = {};
        if (cityId) {
            requestData['city_id'] = cityId;
        }
        if (regionId) {
            requestData['region_id'] = regionId;
        }

        $.ajax({
            url: '/ajax/get_pois_for_city/',
            data: requestData,
            dataType: 'json',
            success: function(data) {
                console.log('POI data received:', data);
                // Clear the POI dropdown first
                $('#id_chosen_poi').empty();
                // Append a default option
                $('#id_chosen_poi').append($('<option>').text('Choose Point of Interest').attr('value', ''));
                // Populate the POI dropdown
                $.each(data, function(index, poi) {
                    console.log('Appending POI:', poi);
                    $('#id_chosen_poi').append($('<option>').text(poi.poi_name).attr('value', poi.poi_id));
                });
            },
            error: function(xhr, status, error) {
                // Handle errors
                console.error(xhr.responseText);
            }
        });
    });

    // Define a function to handle resetting the POI dropdown when "Choose Point of Interest" is selected
    $('#id_chosen_poi').change(function() {
        var poiId = $(this).val();
        if (poiId === '') {
            // If "Choose Point of Interest" is selected, clear the selection in city and region dropdowns
            $('#id_chosen_city').val('');
            $('#id_chosen_region').val('');
        }
    });

});
