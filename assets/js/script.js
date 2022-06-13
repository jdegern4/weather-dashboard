// API Key: 22b259ffc5bac79b608f3999db90154e

var citySearchEl = document.querySelector("#city-search");
var searchBtnEl = document.querySelector("#search-btn");
var historyEl = document.querySelector("#search-history");
var historyBtnEl = document.querySelectorAll(".history-btn");
console.log(historyBtnEl);
var cityNameEl = document.querySelector("#city-name");

var getWeather = function() {
    var citySearched = citySearchEl.value.trim();
    // FORMAT URL FOR CITY SEARCHED
    var cityURL = "https://api.openweathermap.org/geo/1.0/direct?q=" + citySearched + "&limit=5&appid=22b259ffc5bac79b608f3999db90154e"
    fetch(cityURL)
    .then(function(response) {
        if (response.ok) {
            response.json().then(function(data) {
                console.log(data);
                // POPULATE CITY NAME IN CURRENT WEATHER BOX
                cityNameEl.textContent = data[0].name + ", " + data[0].state + " (" + moment().format('l') + ")";

                // GET COORDINATES OF CITY SEARCHED FROM API
                var searchLat = data[0].lat;
                var searchLon = data[0].lon;
                var latLonURL = "https://api.openweathermap.org/data/2.5/onecall?lat=" + searchLat + "&lon=" + searchLon + "&appid=22b259ffc5bac79b608f3999db90154e&units=imperial"
                fetch(latLonURL)
                .then(function(response) {
                    if (response.ok) {
                        response.json().then(function(data) {
                            displayWeather(data);
                            displayFutureWeather(data);
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
    // ADD ICON FOR CURRENT WEATHER NEXT TO CITY NAME AND DATE
    var currentIconEl = document.querySelector("#current-icon");
    var iconCode = data.current.weather[0].icon;
    var iconURL = "http://openweathermap.org/img/wn/" + iconCode + "@2x.png";
    currentIconEl.setAttribute("src", iconURL);
    

    // DISPLAY CURRENT TEMPERATURE, WIND SPEED, HUMIDITY, And UV INDEX
    var tempEl = document.querySelector("#temp");
    var windEl = document.querySelector("#wind");
    var humidityEl = document.querySelector("#humidity");
    var uvEl = document.querySelector("#uv");
    var uvIndex = document.createElement("span");
    uvIndex.classList.add("badge");
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

var displayFutureWeather = function(data) {
    var futureDayEl = document.querySelectorAll(".five-day-box");
    // LOOP OVER EACH FUTURE DAY CARD
    for (var i = 0; i < 5; i++) {
        // SET VARIABLE FOR GETTING CORRECT DAY'S WEATHER FROM ARRAY
        var futureIndex = i + 1;
        // GET HTML ELEMENTS FOR FUTURE DAY CARD
        var futureDateEl = futureDayEl[i].querySelector(".future-date");
        var futureIconEl = futureDayEl[i].querySelector(".future-icon");
        var futureIconCode = data.daily[futureIndex].weather[0].icon;
        var futureIconURL = "http://openweathermap.org/img/wn/" + futureIconCode + "@2x.png";
        var futureTempEl = futureDayEl[i].querySelector(".future-temp");
        var futureWindEl = futureDayEl[i].querySelector(".future-wind");
        var futureHumidityEl = futureDayEl[i].querySelector(".future-humidity");

        futureDateEl.textContent = moment().add(futureIndex, 'days').format('l');
        futureIconEl.setAttribute("src", futureIconURL);
        futureTempEl.textContent = "Temp: " + data.daily[futureIndex].temp.day + "° F";
        futureWindEl.textContent = "Wind: " + data.daily[futureIndex].wind_speed + " mph";
        futureHumidityEl.textContent = "Humidity: " + data.daily[futureIndex].humidity + "%";
        
    };
};

var searchBtnHandler = function(event) {
    event.preventDefault();

    var citySearched = citySearchEl.value.trim();
    
    if (citySearched) {
        getWeather(citySearched);
    } else {
        alert("Please enter a city.");
    }

    // ADD BUTTON WITH CITY SEARCHED TO SEARCH HISTORY
    historyBtnEl[7].innerHTML = historyBtnEl[6].innerHTML;
    historyBtnEl[6].innerHTML = historyBtnEl[5].innerHTML;
    historyBtnEl[5].innerHTML = historyBtnEl[4].innerHTML;
    historyBtnEl[4].innerHTML = historyBtnEl[3].innerHTML;
    historyBtnEl[3].innerHTML = historyBtnEl[2].innerHTML;
    historyBtnEl[2].innerHTML = historyBtnEl[1].innerHTML;
    historyBtnEl[1].innerHTML = historyBtnEl[0].innerHTML;
    historyBtnEl[0].innerHTML = citySearched;
};

var historyBtnHandler = function(event) {
    event.preventDefault();
    console.log("you clicked on a piece of history!");
    var historyBtnText = event.target.innerHTML;
    console.log(historyBtnText);
    citySearchEl.value = historyBtnText;
    getWeather();
};

searchBtnEl.addEventListener("click", searchBtnHandler);
for (var i = 0; i < historyBtnEl.length; i++) {
    historyBtnEl[i].addEventListener("click", historyBtnHandler, false);
};