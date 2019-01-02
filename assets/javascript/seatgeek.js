function displaySeatGeek () {
    database.ref(city + "/").once("value", function (citySnapshot){
        var sgSnap = citySnapshot.val();
        lat = sgSnap.lat;
        lng = sgSnap.lng;
    }).then(function(){
        
    var queryURL = "https://api.seatgeek.com/2/events?lat=" + lat + "&lon=" + lng + "&type=concert&client_id=MTQ2ODg3ODd8MTU0NjM3NTgzMS43NQ"

$.ajax({
    url: queryURL,
    method: "GET"
}).then(function(sgResponse) {
    console.log(sgResponse);
    for (var i = 0; i < 5; i++) {
        var newRow = $("<tr>");
        var newEvent = $("<td>");
        var newLinkDiv = $("<td>");
        var newLink = $("<a>");
        newLink.addClass("ml-auto")
        newEvent.append(sgResponse.events[i].short_title);
        newLink.text("Tickets");
        newLink.attr("href", sgResponse.events[i].url);
        newLinkDiv.append(newLink);
        newRow.append(newEvent).append(newLinkDiv);
        $("#seatGeekTable").append(newRow);
    }
})
    })
}