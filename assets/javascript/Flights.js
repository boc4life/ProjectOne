function displayKayak () {
  database.ref(city + "/").once("value", function (citySnapshot){
      var sgSnap = citySnapshot.val();
      lat = sgSnap.lat;
      lng = sgSnap.lng;
      moment = moment().add(1, "days").format("YYYY-MM-DD");
      console.log(moment);
      console.log(lat, lng);
  }).then(function(){

    var queryURL = "https://apidojo-kayak-v1.p.rapidapi.com/flights/create-session?origin1=EWR&destination1="+city+"&departdate1="+moment+"&cabin=e&currency=USD&adults=1&bags=0";
    console.log(queryURL)
$.ajax({
    url: queryURL,
    method: "GET",
    dataType: "JSON",
    headers: {
      'X-RapidAPI-Key' : 'K7KGG3KkdrmshbZsXJB2QNoG6CnCp1ZLEzjjsnyZUw5bVF0vLF'
    }
}).then(function(Response) {
  console.log(Response);
        var newRow = $("<tr>");
        var newPrice = $("<td>");
        var newLinkDiv = $("<td>");
        var newLink = $("<a>");
        newLink.addClass("ml-auto")
        newPrice.append("Flights to " + city + ", starting at: " + Response.cheapestPrice);
        newLink.text("Tickets");
        newLink.attr("href", "https://www.kayak.com" + Response.shareURL);
        newLinkDiv.append(newLink);
        newRow.append(newPrice).append(newLink);
        $("#kayakTable").append(newRow).append();

});
  });
}


