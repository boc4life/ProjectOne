
$.getScript("http://maps.google.com/maps/api/js?key=AIzaSyAOqSGsfemsuvxQw6-fkfPm6M-OpPYOCco&libraries=places&callback=loadCarousel");

var service;
var activeSet = false;

var restaurantIDs = ["ChIJUSZwpwjGxokRpPURfAyTF1g", "ChIJOxKK_y_GxokRAcSUh1dzBbM", "ChIJxZ3RpTi0xokRhRTe7KSgpJo"]

// function MapApiLoaded () {
//     var request = {
//         query: "Pat's Philadelphia",
//         fields: ["photos", "formatted_address", "name", "rating", "place_id"]
//     };

//     service = new google.maps.places.PlacesService(map);
//     service.findPlaceFromQuery(request, callback);
// }

// function callback(results, status) {
//     if (status == google.maps.places.PlacesServiceStatus.OK) {
//         console.log(results[0]);
//         console.log(results[0].photos[0].getUrl({"maxWidth": 350, "maxHeight": 350}));
//         $("#photo1"[i]).attr("src", results[0].photos[0].getUrl({"maxWidth": 350, "maxHeight": 350}));
//         $("#name"[i]).html(results[0].name)
//     }
// }

function loadCarousel() {
    console.log("hello")
    for (var i = 0; i < restaurantIDs.length; i++) {
        var request = {
            placeId: restaurantIDs[i],
            fields: ["photos", "name"]
        };
        service = new google.maps.places.PlacesService(map);
        service.getDetails(request, callback);
    }
}

function callback(results, status) {
    console.log(results);
    if (status == google.maps.places.PlacesServiceStatus.OK) {
        var newDiv = $("<div class=\"carousel-item\">");
            if (!activeSet) {
                newDiv.addClass("active");
                activeSet = true;
            }
        var image = $("<img class=\"d-block mx-auto w-100\">");
        var name = $("<p>");
        image.attr("src", results.photos[0].getUrl({"madWidth": 350, "maxHeight": 350}));
        name.append(results.name);
        newDiv.append(image).append(name);
        console.log(newDiv);
        $("#carouselExampleIndicators").prepend(newDiv);
    }
}