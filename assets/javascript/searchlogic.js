// Currently this search only returns the top result. Discuss if we want to keep this as is, or if we'd like to return multiple results.

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
        var yesBtn = $("<button>");
        yesBtn.addClass("data-ID=" + searchResults[0].place_id);
        yesBtn.addClass("yesButton");
        yesBtn.text("Yes")
        var noBtn = $("<button>");
        // I currently have this "No" Button rendering. I'm not sold on including it. Would like some thoughts. This kind of goes hand in hand with the 1 result or multiple results discussion.
        noBtn.addClass("noButton");
        noBtn.text("No");
        $("#searchResultsContainer").append(yesBtn);
    }
}

function addRestaurant() {
    $("#searchResultsContainer").html("Thank you! Your restaurant has been added to our list!")

    // Add the value of "data-id" on the yes button to the city's Firebase. If a user is logged in, maybe attach their username to be displayed to all visitors (e.g. Jim's - Added by _______)?
}

$(document).on("click", ".yesBtn", addRestaurant);
