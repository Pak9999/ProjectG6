<script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>

// Make sure the document is fully rendered before running scripts
$(document).ready(function() {
    $('#id_chosen_continent').change(function() {
        var selectedContinent = $(this).val();
        // Send AJAX request to a Django view that returns the countries for the selected continent
        $.ajax({
            url: "{% url 'get_countries_for_continent' %}",
            data: {
                'continent_id': selectedContinent
            },
            dataType: 'json',
            success: function (data) {
                // Clear the previous options
                $("#id_chosen_country").empty();
                // Assuming you have an empty option at the beginning
                $("#id_chosen_country").append('<option value="">Choose Country</option>');
                // Populate the country select box with new options
                $.each(data, function(index, item) {
                    $("#id_chosen_country").append(
                        $('<option></option>').val(item.id).html(item.name)
                    );
                });
            }
        });
    });

    // Similarly handle changes to 'id_chosen_country' to load regions, and so on...

});
