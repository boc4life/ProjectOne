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

firebase.auth().onAuthStateChanged(function (fbUser) {
  if (fbUser) {
    user = firebase.auth().currentUser;
      console.log(user)
      $(".signIn").addClass("d-none");
      $(".signIn").removeClass("d-inline");
      $("#profileLink").text(user.displayName);
      $("#profileLink").removeClass("d-none");
      uid = user.uid;
      console.log(uid);
  }
})

$(document).ready(function() {

renderCity();
$(".navbarCity").on("click", navbarClick);
$(document).on("click", ".yesButton", addRestaurant);
$("#signInBtn").on("click", signIn);
$("#registerBtn").on("click", register);
})

function register() {
    var email = $("#registerEmail").val().trim();
    var password = $("#registerPassword").val().trim();
    var username = $("#registerUsername").val().trim();
    firebase.auth().createUserWithEmailAndPassword(email, password).catch(function (error) {
        var errorCode = error.code;
        var errorMessage = error.message;
        if (errorCode == "auth/email-already-in-use") {
          alert("Email already in use");
        }
        if (errorCode == "auth/invalid-email") {
          alert("This does not appear to be a valid email address");
        } else {
          alert(errorMessage);
        }
        console.log(error);
      }).then(function () {
        user = firebase.auth().currentUser;
        uid = user.uid;
        user.updateProfile({
            displayName: username
        });
        userDisplay = username;
        return userDisplay
      })
}

function signIn() {
    email = $("#signInEmail").val().trim();
    password = $("#signInPassword").val().trim();
    firebase.auth().signInWithEmailAndPassword(email, password).catch(function (error) {
      var errorCode = error.code;
      var errorMessage = error.message;
      if (errorCode == "auth/invalid-email") {
        alert("Invalid Email");
      }
      if (errorCode == "auth/user-not-found") {
        alert("Username Not Found");
      }
      if (errorCode == "auth/wrong-password") {
        alert("Incorrect Password");
      } else {
        alert(errorMessage);
      }
    }).then(function () {
      user = firebase.auth().currentUser;
      uid = user.uid;
    })
  }

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
        image.attr("src", results.photos[0].getUrl({"madWidth": 350, "maxHeight": 350}));
        name.append(results.name);
        newDiv.append(image).append(name);
        console.log(newDiv);
        $("#carousel-inner").append(newDiv);
    }
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
    localStorage.setItem("currentCity", city);
    renderCity();
}

function renderCity() {
    city = localStorage.getItem("currentCity")

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
        displaySeatGeek();
        displayRestaurants();
        displayWeather(lat, lng);
    })
}
    function displayRestaurants() {
        var service;
        activeSet = false;

        $.getScript("http://maps.google.com/maps/api/js?key=MYKEY&libraries=places&callback=loadCarousel");

    }
