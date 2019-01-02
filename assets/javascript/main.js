
// Initialize Firebase
var config = {
    apiKey: "AIzaSyD2Vlw1HFZkfoEA3_jeOZkiYp-dcbRF7yc",
    authDomain: "project1-7ce8d.firebaseapp.com",
    databaseURL: "https://project1-7ce8d.firebaseio.com",
    projectId: "project1-7ce8d",
    storageBucket: "project1-7ce8d.appspot.com",
    messagingSenderId: "768951951179"
  };
  firebase.initializeApp(config);
    
var database = firebase.database();

var intervalId;
var number = 10;
var user = {
    username: "",
    password: ""
}
var cities = ["New York City", "Philly", "Chicago", "Seattle",
"Washington DC", "Phoenix", "Denver", "Los Angeles", "San Francisco", 
"Houston", "Miami", "Seattle", "Boston", "New Orleans", "Memphis", "Dallas", 
"Charlotte", "Detroit", "Baltimore", "Kansas City", "Atlanta"];

$(document).ready(function() {


database.ref().on("value", function(snapshot) {
//<---------database code---------//

//code for Input at the sign-in/register
function nameInput() {
    $("#Sign-In").on("click", function(event) {
        event.preventDefault();
        user.username = $("#email").val().trim();
        user.password = $("#password").val().trim();
        if (user.username == ""){
        alert("Please enter a name...");
        } else if (user.password == ""){
        alert("Please enter a password...");
        } else if (user.username != "" && user.password != ""){ 
        database.ref("user").set(user);
        $("#register").empty();
        $(".signin").text(snapshot.val().user.username);
        }
    })
}
    nameInput();
    console.log(snapshot.val().user);
});

//<---------web page code---------//

//populates the selection of cities
function populateSelection() {
    for (var i = 0; i < cities.length; i++) {
        var item = $("<a>");
        item.addClass("dropdown-item");
        item.attr("href", "#");
        item.text(cities[i]);
        $(".dropdownbar").append(item);
      }
    }

populateSelection();

function changeBackground() {
    intervalId = setInterval(decrement, 3000);
}

//controls the animation and changing of the background images
function decrement() {
number--;
if (number === 10) {
    $(".bimg").fadeOut(500, function() {
    $(".bimg").css("background", "url('assets/images/Philly.png')");
    $(".bimg").fadeIn(500);
    });
}
else if (number === 6){
    $(".bimg").fadeOut("slow", function() {
        $(".bimg").css("background", "url('assets/images/NewYork.png')");
        });
        $(".bimg").fadeIn("slow");
}
else if (number === 3){
    $(".bimg").fadeOut(500, function() {
        $(".bimg").css("background", "url('assets/images/Chicago.png')");
        });
        $(".bimg").fadeIn(500);
}
else if (number === 0){
    number = 11;
}
}
changeBackground();
});