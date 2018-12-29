var city = "Philadelphia"
var cityBlurb = "Founded in 1682, Philadelphia is one of the most historic cities in the United States. Visitors can immerse themselves in American history, while exploring a city full of culture and cheesesteaks."

$("#cityName").text(city);
$("#cityBlurb").text(cityBlurb);

$.getScript("http://maps.google.com/maps/api/js?key=MYKEY&libraries=places&callback=loadCarousel");

var service;
var activeSet = false;

var restaurantIDs = ["ChIJUSZwpwjGxokRpPURfAyTF1g", "ChIJOxKK_y_GxokRAcSUh1dzBbM", "ChIJxZ3RpTi0xokRhRTe7KSgpJo"]

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
        var image = $("<img class=\"restaurantImage d-block mx-auto w-100\">");
        var name = $("<p>");
        image.attr("src", results.photos[0].getUrl({"madWidth": 350, "maxHeight": 350}));
        name.append(results.name);
        newDiv.append(image).append(name);
        console.log(newDiv);
        $("#carouselExampleIndicators").prepend(newDiv);
    }
}