let currentTime = new Date();
let updated = document.querySelector("#updated");
let week = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

let currentDay = week[currentTime.getDay()];
let timeHour = currentTime.getHours();
if (timeHour < 10) {
  timeHour = `0${timeHour}`;
}
let timeMin = currentTime.getMinutes();
if (timeMin < 10) {
  timeMin = `0${timeMin}`;
}
updated.innerHTML = `Last updated: <strong>${currentDay}, ${timeHour}:${timeMin}</strong>`;

function displayForecast() {
  // console.log(response.data.daily);
  let forecastElement = document.querySelector("#forecast");

  let days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  let forecastHTML = `<div class="row">`;
  days.forEach(function (day) {
    forecastHTML =
      forecastHTML +
      `
      <div class="col">
        <div class="weather-forecast-date">${day}</div>
        <img src="http://openweathermap.org/img/wn/01d@2x.png" id="image"
          class="img-forecast" width="60px" />
        <div class="weather-forecast-temperatures">
          <span class="weather-forecast-temperature-max"> 18° </span>
          <span class="weather-forecast-temperature-min"> 12° </span>
        </div>
      </div>
  `;
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
  console.log(forecastHTML);
}

// function getForecast(coordinates) {
//   console.log(coordinates);
//   let apiKey = "e51c45157578fa9bad045a8c223c29ee";
//   let apiUrl = `https://api.openweathermap.org/data/3.0/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
//   console.log(apiUrl);
//   axios.get(apiUrl).then(displayForecast);
// }

function displayWeatherCondition(response) {
  let tempChange = document.querySelector("#degree");
  let humidity = document.querySelector("#humidity");
  let wind = document.querySelector("#wind");
  let image = document.querySelector("#image");
  let clear = document.querySelector("#clear");

  celsiusTemperature = response.data.main.temp;

  tempChange.innerHTML = `${Math.round(celsiusTemperature)}`;
  humidity.innerHTML = `Humidity: ${response.data.main.humidity}%`;
  wind.innerHTML = `Wind: ${Math.round(response.data.wind.speed)} km/h`;
  image.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  clear.innerHTML = `${response.data.weather[0].main} in <strong> ${response.data.name}</strong>`;
  // console.log(response);
  // getForecast(response.data.coord);
}

function basicCity(city) {
  let apiKey = "e51c45157578fa9bad045a8c223c29ee";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeatherCondition);
}

basicCity("Kyiv");

function searchCity(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#city-input");
  let cityIndicators = document.querySelector("#clear");
  let apiKey = "e51c45157578fa9bad045a8c223c29ee";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityInput.value}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeatherCondition);
  cityIndicators.innerHTML = `Clear in <strong> ${cityInput.value} </strong>`;
}
let cityForm = document.querySelector("#city-form");
cityForm.addEventListener("submit", searchCity) ||
  cityForm.addEventListener("click", searchCity);

function fahrenheit(event) {
  event.preventDefault();
  celForm.classList.remove("inactive");
  farForm.classList.add("inactive");
  let degrees = document.querySelector("#degree");
  let fahrenheitTemp = (celsiusTemperature * 9) / 5 + 32;
  degrees.innerHTML = `${Math.round(fahrenheitTemp)}`;
}
let celsiusTemperature = null;

let farForm = document.querySelector("#fahrenheit-link");
farForm.addEventListener("click", fahrenheit);

function celsius(event) {
  event.preventDefault();
  celForm.classList.add("inactive");
  farForm.classList.remove("inactive");
  let degree = document.querySelector("#degree");
  degree.innerHTML = `${Math.round(celsiusTemperature)}`;
}

let celForm = document.querySelector("#celsius-link");
celForm.addEventListener("click", celsius);

function showTempButton(response) {
  celsiusTemperature = response.data.main.temp;
  let tempChange = document.querySelector("#degree");
  let city = response.data.name;
  let cityIndicators = document.querySelector("#clear");
  let image = document.querySelector("#image");
  tempChange.innerHTML = `${Math.round(celsiusTemperature)}`;
  image.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  cityIndicators.innerHTML = `Clear in <strong> ${city} </strong>`;
  document.querySelector(
    "#humidity"
  ).innerHTML = `Humidity: ${response.data.main.humidity}%`;
  document.querySelector("#wind").innerHTML = `Wind: ${Math.round(
    response.data.wind.speed
  )} km/h`;
  let cityBut = document.querySelector("button");
  cityBut.innerHTML = `${city}`;
}

function retrievePosition(position) {
  let apiKey = "e51c45157578fa9bad045a8c223c29ee";
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showTempButton);
}

function getButton(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(retrievePosition);
}
let butChange = document.querySelector("button");
butChange.addEventListener("click", getButton);
displayForecast();
