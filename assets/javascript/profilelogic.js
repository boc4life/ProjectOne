var uid;
var citiesArray;
var citiesVisitedArray;
var cityName;
var cityDisplay;
var cityDisplayArray = [];
var listKeys = [];
var listItems = [];

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

  var user = firebase.auth().currentUser;

  firebase.auth().onAuthStateChanged(function (fbUser) {
    if (fbUser) {
      user = firebase.auth().currentUser;
        uid = user.uid;
        var displayName = user.displayName
        $(".signIn").addClass("d-none");
        $(".signIn").removeClass("d-inline");
        $("#profileLink").text(displayName);
        $("#profileLink").removeClass("d-none");
        adjustMarkers();
        loadWishLists();
        appendJoinDate();
        navbarUpdate();
        $("#logoutBtn").removeClass("d-none")
    }
    if (!fbUser) {
        $(".signIn").removeClass("d-none").addClass("d-inline");
        $("#profileLink").addClass("d-none")
        $("#profileUserName").text("");
        $("#memberSinceSpan").text("");
        $("#logoutBtn").addClass("d-none")
        $("#wishListUL").empty();
        $("#citiesVisitedTable").empty();
    }
  })

  $(document).ready(function(){
    city = localStorage.getItem("currentCity");
    database.ref(city + "/").once("value", function (citySnapshot){
        var snap = citySnapshot.val();
        backgroundImg = snap.photo;
        $("#background").css("background-image", "url(assets/images/" + backgroundImg)
    })

    $(document).on("click", ".cityMarkerImg", pointClick);
    $(".navbarCity").on("click", navbarClick);
    $("#signInBtn").on("click", signIn);
    $("#registerBtn").on("click", register);
    $("#logoutBtn").on("click", logout);
    $(document).on("click", ".removeBtn", removeCity);
    $(document).on("click", ".wishListCity", wishListDisplay)
  })

var points = [
    {x:780, y:190, city: "Philadelphia"}, 
    {x:801, y:170, city: "New-York"},
    {x:68, y:309, city: "Los-Angeles"},
    {x:580, y:180, city: "Chicago"},
    {x:172, y:334, city: "Phoenix"},
    {x:471, y:447, city: "Houston"},
    {x:25, y:214, city: "San-Francisco"},
    {x:761, y:220, city: "Washington-DC"},
    {x:313, y:227, city: "Denver"},
    {x:758, y:494, city: "Miami"},
    {x:89, y:12, city: "Seattle"},
    {x:834, y:128, city: "Boston"},
    {x:570, y:433, city: "New-Orleans"},
    {x:558, y:321, city: "Memphis"},
    {x:437, y:386, city: "Dallas"},
    {x:706, y:303, city: "Charlotte"},
    {x:652, y:163, city: "Detroit"},
    {x:769, y:210, city: "Baltimore"},
    {x:476, y:243, city: "Kansas-City"},
    {x:658, y:345, city: "Atlanta"},
    {x:134, y:274, city: "Las-Vegas"}
]
function drawPoint(point){   
        div = $("<div />")
        img = $("<img>")
            div.attr("class", 'cityMarker')
            img.attr("data-city", point.city)
            img.attr("data-clicked", "no")
            img.attr("src", "assets/images/emptymarker.png")
            img.attr("class", "cityMarkerImg")
            img.attr("id", point.city)
            div.append(img)
            div.css("top", point.y)
            div.css("left", point.x)
            $("#mapContainer").append(div)
}
for (var i = 0; i < points.length; i++) {
  drawPoint(points[i]);
}

function pointClick() {
    var clickedCity = $(this).attr("data-city")
    var isClicked = $(this).attr("data-clicked")
    console.log(clickedCity)
    if (isClicked == "no") {
        var cityNameDisplay = clickedCity;
        cityNameDisplay = cityNameDisplay.replace(/-/g, " ")
        $(this).attr("src", "assets/images/checkmark.png");
        $(this).attr("data-clicked", "yes");
        var newRow = $("<tr>");
        var newCity = $("<td>");
        var newButtonDiv = $("<td>");
        var newButton = $("<button>");
        newCity.append(cityNameDisplay);
        newRow.attr("id", clickedCity + "TableRow");
        newButton.addClass("btn-small btn-danger removeBtn");
        newButton.attr("data-id", clickedCity);
        newButton.text("X");
        newButtonDiv.append(newButton);
        newRow.append(newCity).append(newButtonDiv);
        $("#citiesVisitedTable").append(newRow)
        database.ref("users/" + uid + "/citiesVisited").update({
            [clickedCity]: "yes"
        })
}   if (isClicked == "yes") {
        $(this).attr("src", "assets/images/emptymarker.png");
        $(this).attr("data-clicked", "no");
        database.ref("users/" + uid + "/citiesVisited").update({
            [clickedCity]: "no"
        })
        $("#" + clickedCity + "TableRow").remove();
}
}

  function adjustMarkers() {
      database.ref("users/" + uid + "/citiesVisited").once("value").then(function(userSnapshot){
        userSnap = userSnapshot.val();
        console.log(userSnap);
        citiesArray = Object.entries(userSnap);
        console.log(citiesArray)
        for (var [cityName, visited] of citiesArray) {
            if (visited == "yes") {
                var cityNameDisplay = cityName;
                cityNameDisplay = cityNameDisplay.replace(/-/g, " ");
                console.log(cityNameDisplay);
                $("#" + cityName).attr("src", "assets/images/checkmark.png")
                $("#" + cityName).attr("data-clicked", "yes")
                var newRow = $("<tr>");
                var newCity = $("<td>");
                var newButtonDiv = $("<td>");
                var newButton = $("<button>");
                newCity.append(cityNameDisplay);
                newRow.attr("id", cityName + "TableRow");
                newButton.addClass("btn-small btn-danger removeBtn");
                newButton.attr("data-id", cityName);
                newButton.text("X");
                newButtonDiv.append(newButton);
                newRow.append(newCity).append(newButtonDiv);
                $("#citiesVisitedTable").append(newRow)
            }
        }
    })
}

function removeCity() {
    var clickedBtn = $(this).attr("data-id");
    console.log(clickedBtn);
    $("#" + clickedBtn).attr("src", "assets/images/emptymarker.png");
    $("#" + clickedBtn + "TableRow").remove();
    database.ref("users/" + uid + "/citiesVisited").update({
        [clickedBtn]: "no"
    })
}

function navbarClick () {
    console.log("Click");
    city = $(this).attr("data-name");
    localStorage.setItem("currentCity", city);
    window.open("examplecitypage.html","_self");
}

function loadWishLists () {
    database.ref("users/" + uid + "/wishLists").once("value", function(citiesListSnap) {
        citiesList = citiesListSnap.val();
        console.log(citiesList);
        parsedCitiesList = [];
        parsedCitiesList = Object.keys(citiesList);
        console.log(parsedCitiesList);
        for (var i = 0; i < parsedCitiesList.length; i++){
        database.ref(parsedCitiesList[i]).once("value", function(citySnap){
            var citySnapshot = citySnap.val();
            cityDisplay = citySnapshot.name;
            cityDisplayArray.push(cityDisplay)
        })
      }
      setTimeout(function() {
        console.log(cityDisplayArray)
        for (var j = 0; j < cityDisplayArray.length; j++) {
        var listItem = $("<li class='list-group-item'>");
        listItem.append(cityDisplayArray[j]);
        listItem.addClass("wishListCity");
        listItem.attr("data-listCity", parsedCitiesList[j]);
        $("#wishListCities").append(listItem);
        }
      },500)
})
}

function appendJoinDate() {
    database.ref("users/" + uid).once("value", function(profileSnap){
        var profile = profileSnap.val();
        console.log(profile);
        var joinDate = profile.dateJoined;
        $("#memberSinceSpan").text(joinDate);
    })
}

function wishListDisplay () {
    var listCity = $(this).attr("data-listCity");
    $("#wishListUL").empty();
    $("#wishListItems").removeClass("d-none");
    database.ref("users/" + uid + "/wishLists/" + listCity).once("value", function(listSnapshot){
        var listSnap = listSnapshot.val();
        listKeys = Object.values(listSnap);
        console.log(listKeys);
    })
    setTimeout(function() {
        for (var i = 0; i < listKeys.length; i++) {
        newItem = Object.values(listKeys[i])
        console.log(newItem);
        var listItem = $("<li class='list-group-item'>")
        listItem.append(newItem);
        $("#wishListUL").append(listItem);
    }
    }, 500)
}