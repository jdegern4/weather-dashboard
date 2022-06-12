// API Key: 22b259ffc5bac79b608f3999db90154e

var citySearchEl = document.querySelector("#city-search");
var searchBtnEl = document.querySelector("#search-btn");

var getWeather = function() {
    var citySearched = citySearchEl.value.trim();
    // FORMAT URL FOR CITY SEARCHED
    var cityURL = "http://api.openweathermap.org/geo/1.0/direct?q=" + citySearched + "&limit=5&appid=22b259ffc5bac79b608f3999db90154e"
    fetch(cityURL)
    .then(function(response) {
        if (response.ok) {
            response.json().then(function(data) {
                console.log(data);
                // POPULATE CITY NAME IN CURRENT WEATHER BOX
                var cityNameEl = document.querySelector("#city-name");
                cityNameEl.textContent = data[0].name + ", " + data[0].state

                // GET COORDINATES OF CITY SEARCHED FROM API
                var searchLat = data[0].lat;
                var searchLon = data[0].lon;
                var latLonURL = "https://api.openweathermap.org/data/2.5/onecall?lat=" + searchLat + "&lon=" + searchLon + "&appid=22b259ffc5bac79b608f3999db90154e&units=imperial"
                fetch(latLonURL)
                .then(function(response) {
                    if (response.ok) {
                        response.json().then(function(data) {
                            displayWeather(data);
                        })
                    } else {
                        alert("City not found.");
                    }
                })
                .catch(function(error) {
                    alert("Unable to connect to weather.");
                })
            });
        } else {
            alert("City not found.");
        }
    })
    .catch(function(error) {
        alert("Unable to connect to weather.");
    })

    
};

var displayWeather = function(data) {
    console.log(data);
    var tempEl = document.querySelector("#temp");
    var windEl = document.querySelector("#wind");
    var humidityEl = document.querySelector("#humidity");
    var uvEl = document.querySelector("#uv");
    var uvIndex = document.createElement("span");
    uvIndex.classList.add("badge");
    // var currentTemp = data.main.temp;
    tempEl.textContent = "Temp: " + data.current.temp + "° F";
    windEl.textContent = "Wind: " + data.current.wind_speed + " mph";
    humidityEl.textContent = "Humidity: " + data.current.humidity + "%";
    uvIndex.innerHTML = data.current.uvi;
    if (data.current.uvi < 3) {
        uvIndex.classList.add("bg-success");
    } else if (data.current.uvi < 6) {
        uvIndex.classList.add("bg-warning");
    } else {
        uvIndex.classList.add("bg-danger");
    };
    uvEl.append(uvIndex);

};

var searchBtnHandler = function(event) {
    event.preventDefault();

    var citySearched = citySearchEl.value.trim();
    console.log(citySearched);

    if (citySearched) {
        getWeather(citySearched);
    } else {
        alert("Please enter a city.");
    }
};

searchBtnEl.addEventListener("click", searchBtnHandler);