$("#restaurantSearchBtn").on("click", clickSearch);

var city = "philadelphia" 
var latlng = {lat: 39.9526, lng: -75.1652}

function clickSearch() {
    $.getScript("http://maps.google.com/maps/api/js?key=MYKEY&libraries=places&callback=restaurantSearch");
}

function restaurantSearch() {
    var searchQuery = $("#restaurantSearch").val().trim();

    var request = {
        query: searchQuery,
        locationBias: latlng,
        fields: ["name", "formatted_address", "place_id"]
    }

    service = new google.maps.places.PlacesService(map);
    service.findPlaceFromQuery(request, searchCallback);
}

function searchCallback (searchResults, status) {
    if (status == google.maps.places.PlacesServiceStatus.OK) {
        console.log(searchResults);
        $("#searchResultsContainer").empty();
        $("#searchResultsContainer").html("Do you mean " + searchResults[0].name + " at " + searchResults[0].formatted_address + "?");
    }
}