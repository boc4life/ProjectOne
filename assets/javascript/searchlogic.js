// Currently this search only returns the top result. Discuss if we want to keep this as is, or if we'd like to return multiple results.

$("#restaurantSearchBtn").on("click", clickSearch);

var city = "philadelphia" 
var latlng = {lat: 39.9526, lng: -75.1652}

function clickSearch() {
    $.getScript("http://maps.google.com/maps/api/js?key=AIzaSyD7rrcP_wAQd4SZa6nZVTbMsyMQp1v2Ml4&libraries=places&callback=restaurantSearch");
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
        var yesBtn = $("<button>");
        yesBtn.attr("data-ID", searchResults[0].place_id);
        yesBtn.addClass("yesButton");
        yesBtn.text("Yes");
        $("#searchResultsContainer").append(yesBtn);
        console.log(user);
    }
}

function addRestaurant() {
    $("#searchResultsContainer").html("Thank you! Your restaurant has been added to our list!")
    var newRest = $(this).attr("data-ID");
    console.log(newRest);
    database.ref(city + "/restaurants").push(newRest);
}

