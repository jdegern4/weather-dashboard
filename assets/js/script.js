// API Key: 22b259ffc5bac79b608f3999db90154e

var citySearchEl = document.querySelector("#city-search");
var searchBtnEl = document.querySelector("#search-btn");

var getWeather = function() {
    var apiURL = 
};

var searchBtnHandler = function(event) {
    event.preventDefault();

    var citySearched = citySearchEl.value.trim();
    console.log(citySearched);

    if (citySearched) {
        getWeather(citySearched);
    } else {
        alert("Please enter a city");
    }
};

searchBtnEl.addEventListener("click", searchBtnHandler);