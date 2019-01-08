
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

var intervalId;
var number = 10;
var city;
var user = {
    username: "",
    password: ""
}
var cities = ["NewYork", "Philadelphia", "Chicago", "Seattle",
"WashingtonDC", "Phoenix", "Denver", "LosAngeles", "SanFrancisco", 
"Houston", "Miami", "Seattle", "Boston", "NewOrleans", "Memphis", "Dallas", 
"Charlotte", "Detroit", "Baltimore", "KansasCity", "Atlanta"];

var user = firebase.auth().currentUser;
firebase.auth().onAuthStateChanged(function (user) {
  if (user) {
      console.log(user.displayName);
      $(".signIn").addClass("d-none");
      $(".signIn").removeClass("d-inline");
      $(".register").addClass("d-none");
      $(".register").removeClass("d-inline");
      $("#profileLink").text(user.displayName);
      $("#userName").text("Hello, " + user.displayName);
      $("#profileLink").removeClass("d-none");
      uid = user.uid;
  }
})

$(document).ready(function() {


database.ref().on("value", function(snapshot) {
//<---------database code---------//

//code for Input at the sign-in/register
$("#signInBtn").on("click", signIn);
$("#registerBtn").on("click", register);
});

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

//<---------web page code---------//

//populates the selection of cities
function populateSelection() {
    for (var i = 0; i < cities.length; i++) {
        var item = $("<a>");
        item.addClass("dropdown-item");
        item.attr("href", "examplecitypage.html");
        item.attr("currentCity", cities[i].toLowerCase());
        item.text(cities[i]);
        $(".dropdownbar").append(item);
      }
    }

    console.log(city);
populateSelection();

$(".dropdown-item").on("click",function() {
city = $(this).attr("currentCity");
console.log(city);
localStorage.setItem("currentCity", city);
});


function changeBackground() {
    intervalId = setInterval(decrement, 3000);
}

//controls the animation and changing of the background images
function decrement() {
number--;
if (number === 10) {
    $(".bimg").fadeOut(500, function() {
    $(".bimg").css("background", "url('assets/images/philadelphiaphoto.png')");
    $(".bimg").css("background-position", "center");
        $(".bimg").css("background-repeat", "no-repeat");
        $(".bimg").css("background-size", "cover");
        $(".bimg").css("height", "100%");
        $(".bimg").css("width", "100%");
    $(".bimg").fadeIn(500);
    });
}
else if (number === 6){
    $(".bimg").fadeOut("slow", function() {
        $(".bimg").css("background", "url('assets/images/newyorkphoto.jpg')");
        $(".bimg").css("background-position", "center");
        $(".bimg").css("background-repeat", "no-repeat");
        $(".bimg").css("background-size", "cover");
        $(".bimg").css("height", "100%");
        $(".bimg").css("width", "100%");
        });
        $(".bimg").fadeIn("slow");
}
else if (number === 3){
    $(".bimg").fadeOut(500, function() {
        $(".bimg").css("background", "url('assets/images/chicagophoto.png')");
        $(".bimg").css("background-position", "center");
        $(".bimg").css("background-repeat", "no-repeat");
        $(".bimg").css("background-size", "cover");
        $(".bimg").css("height", "100%");
        $(".bimg").css("width", "100%");
        });
        $(".bimg").fadeIn(500);
}
else if (number === 0){
    number = 11;
}
}
changeBackground();

var points = [
  {x:780, y:190, city: "Philadelphia"}, 
  {x:801, y:170, city: "New York"},
  {x:68, y:309, city: "Los Angeles"},
  {x:580, y:180, city: "Chicago"},
  {x:172, y:334, city: "phoenix"},
  {x:471, y:447, city: "houston"},
  {x:25, y:214, city: "san francisco"},
  {x:761, y:220, city: "washington dc"},
  {x:313, y:227, city: "denver"},
  {x:758, y:494, city: "miami"},
  {x:89, y:12, city: "seattle"},
  {x:834, y:128, city: "boston"},
  {x:570, y:433, city: "new orleans"},
  {x:558, y:321, city: "memphis"},
  {x:437, y:386, city: "dallas"},
  {x:706, y:303, city: "charlotte"},
  {x:652, y:163, city: "detroit"},
  {x:769, y:210, city: "baltimore"},
  {x:476, y:243, city: "kansas city"},
  {x:658, y:345, city: "atlanta"},
  
]
function drawPoint(point){   
      div = $("<div />")
          div.attr("class", 'cityMarker')
          div.css("top", point.y)
          div.css("left", point.x)
          $("#container").append(div)
}
for (var i = 0; i < points.length; i++) {
drawPoint(points[i]);
}

console.log("hello")
});