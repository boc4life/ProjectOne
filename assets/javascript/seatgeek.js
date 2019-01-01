var lat = 39.9526
var lng = -75.1652
var queryURL = "https://api.seatgeek.com/2/events?lat=" + lat + "&lon=" + lng + "&type=concert&client_id=MTQ2ODg3ODd8MTU0NjM3NTgzMS43NQ"

$.ajax({
    url: queryURL,
    method: "GET"
}).then(function(sgResponse) {
    console.log(sgResponse);
    for (var i = 0; i < 5; i++) {
        var newRow = $("<tr>");
        var newEvent = $("<td>");
        var newButtonDiv = $("<td>");
        var newButton = $("<button>");
        newButtonDiv.addClass("ml-auto")
        newEvent.append(sgResponse.events[i].short_title);
        newButton.text("Tickets");
        newButtonDiv.append(newButton);
        newRow.append(newEvent).append(newButtonDiv);
        $("#seatGeekTable").append(newRow);
    }
})