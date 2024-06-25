// in the response we have the info from the api
function refreshWeather(response) {
  //now i create a variable called temperatureElement to store the element ....
  let temperatureElement = document.querySelector("#temperature");
  let temperature = response.data.temperature.current;
  let cityElement = document.querySelector("#city");
  let descriptionElememt = document.querySelector("#description");
  let humidityElement = document.querySelector("#humidity");
  let windSpeedElement = document.querySelector("#wind-speed");
  let timeElement = document.querySelector("#time");
  let date = new Date(response.data.time * 1000);
  let iconElement = document.querySelector("#icon");
  iconElement.innerHTML = `<img src=${response.data.condition.icon_url}  class="weather-app-icon"/>`;
  timeElement.innerHTML = formatDate(date);

  windSpeedElement.innerHTML = `${response.data.wind.speed} Km/h`;
  humidityElement.innerHTML = `${response.data.temperature.humidity}%`;
  descriptionElememt.innerHTML = response.data.condition.description;
  cityElement.innerHTML = response.data.city;
  temperatureElement.innerHTML = Math.round(temperature);
  getForecast(response.data.city);
}

function formatDate(date) {
  let minutes = date.getMinutes();
  let hours = date.getHours();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()];

  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  return `${day}, ${hours}:${minutes}`;
}

function searchCity(city) {
  //step 2 after we refresh, first function to run
  let apiKey = `6a4bo439f4518f900acccae6f3t294be`;
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
  // axios gets info from api and then calls the function refreshWeather and it sends the response to it
  axios.get(apiUrl).then(refreshWeather);
}

function handleSearchSubmit(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-form-input");

  searchCity(searchInput.value);
}
//new project forecast starts here...
function getForecast(city) {
  let apiKey = "6a4bo439f4518f900acccae6f3t294be";
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=metric`;
  console.log(apiUrl);
  axios(apiUrl).then(displayForecast);
}

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return days[date.getDay()];
}

function displayForecast(response) {
  let forecastHtml = "";

  response.data.daily.forEach(function (day, index) {
    if (index < 5) {
      forecastHtml =
        forecastHtml +
        `
      <div class = "weather-forecast-day">
        <div class = "weather-forecast-date">${formatDay(day.time)}</div>
        <img src= "${day.condition.icon_url}" class = "weather-forecast-icon"/>
        
        <div class ="weather-forecast-temperatures">
                 <div class ="weather-forecast-temperature">
                    <strong>${Math.round(day.temperature.maximum)}°</strong>
                  </div>
           <div class ="weather-forecast-temperature">${Math.round(
             day.temperature.minimum
           )}°
           </div>
          </div> 
      </div>
`;
    }
  });

  let forecastElement = document.querySelector("#forecast");
  forecastElement.innerHTML = forecastHtml;
}

//new project forecast finishes here...

// step 1 when we refresh
let searchFormElement = document.querySelector("#search-form");
searchFormElement.addEventListener("submit", handleSearchSubmit);
searchCity("Locorotondo");
