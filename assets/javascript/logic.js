// With our finished product, all of these variables should receive their values through accessing our Firebase database.
// I believe our best bet is to use localStorage to store the current city the user is viewing.
// Front end display of restaurant images needs a lot of work. I'm also having difficulty with the text that says "Have a restaurant you'd like to add...", as I can't figure out why it gets pushed to center after the function callback runs.
// How much more do we want to do with the carousel? Should we make each restaurant clickable? If so, what do we want it to do? Several options...
// Option One: Bring user to Google Places info page for the restaurant. I'm 99% sure this is possible but not 100.
// Option Two: Stop carousel, display more info about restaurant somewhere on the page. Might be a bit difficult to implement the logic and design for this.
// Option Three: Don't make restaurants clickable, just display more restaurant info while the carousel is running.
// Other options or ideas are welcome and encouraged. I'm just writing out what's coming to my mind now.

  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyCkRM_8C5obGVgwlWk87Oen6gpaA475yBE",
    authDomain: "rutgersinfocities.firebaseapp.com",
    databaseURL: "https://rutgersinfocities.firebaseio.com",
    projectId: "rutgersinfocities",
    storageBucket: "rutgersinfocities.appspot.com",
    messagingSenderId: "763372287123"
  };
  firebase.initializeApp(config);
  var database = firebase.database();

var city;
var cityDisplay;
var cityBlurb;
var restaurantIDs;
var activeSet;
var lat;
var lng;
var latlng;
var user = false;
var uid;
var userDisplay;
var displayName;

firebase.auth().onAuthStateChanged(function (fbUser) {
  if (fbUser) {
    user = firebase.auth().currentUser;
      uid = user.uid;
      displayName = user.displayName;
      console.log(user);
      console.log(uid);
      console.log(displayName);
      navbarUpdate();
    }
    if (!fbUser) {
        $(".signIn").removeClass("d-none").addClass("d-inline");
        $("#profileLink").addClass("d-none")
    }
}
)

$(document).ready(function() {

renderCity();
$(".navbarCity").on("click", navbarClick);
$(document).on("click", ".yesButton", addRestaurant);
$("#signInBtn").on("click", signIn);
$("#registerBtn").on("click", register);
$(document).on("click", "#wishListAdd", wishListAdd)
$(document).on("click", ".removeBtn", removeWishItem)
$(document).on("click", "#logoutBtn", logout)
$(document).on("click", ".restaurantImage", function(event) {
    $(this).closest('.carousel-item').find('.add-info').removeClass("d-none");
    $("#carouselExampleIndicators").carousel('pause');
})

})

function loadCarousel() {
    console.log(restaurantIDs);
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
        var moreInfo = $("<div class='add-info d-none'>");
        moreInfo.append("Additional Restaurant Info Here");
        image.attr("src", results.photos[0].getUrl({"madWidth": 350, "maxHeight": 350}));
        name.append(results.name);
        newDiv.append(name).append(image).append(moreInfo);
        console.log(newDiv);
        $("#carousel-inner").append(newDiv);
    }
}

function testInfo(){
    $(this).closest('.carousel-item').find('.add-info').removeClass("d-none");
    console.log("click");
    
    console.log("click1");
 }

function navbarClick () {
    console.log("CLICK");
    var city = $(this).attr("data-name");
    console.log(city)
    $("#cityName").empty();
    $("#cityBlurb").empty();
    $("#carousel-inner").empty();
    $("#searchResultsContainer").empty();
    $("#temperature").empty();
    $("#clouds").empty();
    $("#weatherImageBox").empty();
    $("#seatGeekTable").empty();
    $("#kayakTable").empty();
    localStorage.setItem("currentCity", city);
    renderCity();
}

function renderCity() {
    city = localStorage.getItem("currentCity");

    database.ref(city + "/").once("value", function (citySnapshot){
        var snap = citySnapshot.val();
        console.log(snap)
        cityBlurb = snap.cityBlurb;
        cityDisplay = snap.name;
        latlng = snap.latlng;
        lat = snap.lat;
        lng = snap.lng
        backgroundImg = snap.photo;
        restaurantIDs = Object.values(snap.restaurants);
        $("#background").css("background-image", "url(assets/images/" + backgroundImg)
        $("#cityBlurb").text(cityBlurb);
        $("#cityName").text(cityDisplay);
        $("#wishListCity").text(cityDisplay);
        $("#wishListTable").empty();
        displayWishList();
        displaySeatGeek();
        displayRestaurants();
        displayKayak();
        displayWeather(lat, lng);
    })
}
    function displayRestaurants() {
        var service;
        activeSet = false;

        $.getScript("https://maps.google.com/maps/api/js?key=AIzaSyD7rrcP_wAQd4SZa6nZVTbMsyMQp1v2Ml4&libraries=places&callback=loadCarousel");
    }



    function wishListAdd() {
        var newItemInput = $("#wishListInput").val().trim();
        $("#wishListInput").val("");
        var newRow = $("<tr>");
        var newItemDiv = $("<td>");
        var newButtonDiv = $("<td>");
        var newButton = $("<button>");
        var newItemKey = database.ref().child("users/" + uid + "/wishLists/" + city).push().key;
        newItemDiv.append(newItemInput);
        newButton.addClass("btn-small btn-danger removeBtn");
        newButton.attr("data-id", newItemKey);
        newButton.text("X");
        newButtonDiv.append(newButton);
        newRow.attr("id", newItemKey + "TableRow");
        newRow.append(newItemDiv).append(newButtonDiv);
        $("#wishListTable").append(newRow);
        database.ref("users/" + uid + "/wishLists/" + city + "/" + newItemKey).set({
            item: newItemInput
        })
    }

    function displayWishList() {
        database.ref("users/" + uid + "/wishLists/" + city).once("value", function(listSnapshot) {
        var listSnap = listSnapshot.val();
        var listObjects = [];
        var listItems = [];
        var listKeys = [];
        listKeys = Object.keys(listSnap);
        listObjects = Object.values(listSnap);
        console.log(listKeys);
        listObjects.forEach(function(obj){
            var newItem = obj.item;
            listItems.push(newItem);
        })
        console.log(listItems);
        for (i = 0; i < listItems.length; i++) {
            var newItemInput = listItems[i];
            var newRow = $("<tr>");
            var newItemDiv = $("<td>");
            var newButtonDiv = $("<td>");
            var newButton = $("<button>");
            newItemDiv.append(newItemInput);
            newButton.addClass("btn-small btn-danger removeBtn");
            newButton.attr("data-id", listKeys[i]);
            newButton.text("X");
            newButtonDiv.append(newButton);
            newRow.attr("id", listKeys[i] + "TableRow")
            newRow.append(newItemDiv).append(newButtonDiv);
            $("#wishListTable").append(newRow);
        }
        })
    }

    function removeWishItem () {
        var itemKey = $(this).attr("data-id");
        database.ref("users/" + uid + "/wishLists/" + city + "/" + itemKey).remove();
        $("#" + itemKey + "TableRow").remove();
    }