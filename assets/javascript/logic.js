// With our finished product, all of these variables should receive their values through accessing our Firebase database.
// I believe our best bet is to use localStorage to store the current city the user is viewing.
// Front end display of restaurant images needs a lot of work. I'm also having difficulty with the text that says "Have a restaurant you'd like to add...", as I can't figure out why it gets pushed to center after the function callback runs.
// How much more do we want to do with the carousel? Should we make each restaurant clickable? If so, what do we want it to do? Several options...
// Option One: Bring user to Google Places info page for the restaurant. I'm 99% sure this is possible but not 100.
// Option Two: Stop carousel, display more info about restaurant somewhere on the page. Might be a bit difficult to implement the logic and design for this.
// Option Three: Don't make restaurants clickable, just display more restaurant info while the carousel is running.
// Other options or ideas are welcome and encouraged. I'm just writing out what's coming to my mind now.

var city = "Philadelphia"
var cityBlurb = "Founded in 1682, Philadelphia is one of the most historic cities in the United States. Visitors can immerse themselves in American history, while exploring a city full of culture and cheesesteaks."

$("#cityName").text(city);
$("#cityBlurb").text(cityBlurb);

$.getScript("http://maps.google.com/maps/api/js?key=MYKEY&libraries=places&callback=loadCarousel");

var service;
var activeSet = false;

var restaurantIDs = ["ChIJUSZwpwjGxokRpPURfAyTF1g", "ChIJOxKK_y_GxokRAcSUh1dzBbM", "ChIJxZ3RpTi0xokRhRTe7KSgpJo"]

function loadCarousel() {
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
        $("#carouselExampleIndicators").append(newDiv);
    }
}
