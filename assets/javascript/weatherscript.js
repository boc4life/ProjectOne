function displayWeather(weatherCity) {
    $.getJSON("http://api.openweathermap.org/data/2.5/weather?q=" + weatherCity + "&appid=024da1946af1ea1a5b7e6fecc2ca1dc5").then(function(weatherResponse) {
    console.log(weatherResponse);
    if (weatherResponse.weather[0].id >= 200 && weatherResponse.weather[0].id < 300) {
        $("#weatherImageBox").prepend("<img class=weatherImage src=assets/images/thunderstorm.png>");
    } else if (weatherResponse.weather[0].id >= 300 && weatherResponse.weather[0].id < 500) {
        $("#weatherImageBox").prepend("<img class=weatherImage src=assets/images/lightrain.png>");
    } else if (weatherResponse.weather[0].id >= 500 && weatherResponse.weather[0].id < 600) {
        $("#weatherImageBox").prepend("<img class=weatherImage src=assets/images/rainy.png>");
    } else if (weatherResponse.weather[0].id >= 600 && weatherResponse.weather[0].id < 700) {
        $("#weatherImageBox").prepend("<img class=weatherImage src=assets/images/snow.png>");
    } else if (weatherResponse.weather[0].id >= 700 && weatherResponse.weather[0].id < 800) {
        $("#weatherImageBox").prepend("<img class=weatherImage src=assets/images/mist.png>");
    } else if (weatherResponse.weather[0].id == 800) {
        $("#weatherImageBox").prepend("<img class=weatherImage src=assets/images/clear.png>");
    } else if (weatherResponse.weather[0].id == 801) {
        $("#weatherImageBox").prepend("<img class=weatherImage src=assets/images/partlycloudy.png>");
    } else if (weatherResponse.weather[0].id == 802) {
        $("#weatherImageBox").prepend("<img class=weatherImage src=assets/images/cloudy.png>");
    } else if (weatherResponse.weather[0].id > 802) {
        $("#weatherImageBox").prepend("<img class=weatherImage src=assets/images/overcast.png>");
    }

    var kelvin = weatherResponse.main.temp
    var temp = 9/5*(kelvin - 273) + 32
    var tempDisplay = temp.toFixed(0)
    $("#temperature").prepend(tempDisplay);
    $("#clouds").text(weatherResponse.clouds.all)
})
}