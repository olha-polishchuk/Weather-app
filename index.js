//   `It is currently ${Math.round(weather[city].temp)}°C
// (${Math.round((weather[city].temp * 9) / 5 + 32)}°F)

let currentTime = new Date();
let change = document.querySelector("#change");
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
change.innerHTML = `Today is ${currentDay}, ${timeHour}:${timeMin}`;

function displayWeatherCondition(response) {
  document.querySelector("#celsius").innerHTML = `${Math.round(
    response.data.main.temp
  )}°C`;
  console.log(response);
  document.querySelector(
    "#humidity"
  ).innerHTML = `Humidity: ${response.data.main.humidity}%`;
  document.querySelector("#wind").innerHTML = `Wind: ${Math.round(
    response.data.wind.speed
  )} km/h`;
  document.querySelector(
    "#clear"
  ).innerHTML = `${response.data.weather[0].main} in <strong> ${response.data.name}</strong>`;
  document
    .querySelector("#image")
    .setAttribute(
      "src",
      `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
    );
}
function searchCity(city) {
  let apiKey = "1232f73dc68c5b5be0e1f667a96ca434";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeatherCondition);
}

function showCity(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#city-input");
  let cityIndicators = document.querySelector("#clear");
  cityIndicators.innerHTML = `Clear in <strong> ${cityInput.value} </strong>`;
}
let cityForm = document.querySelector("#city-form");
cityForm.addEventListener("submit", showCity);

let apiKey = "1232f73dc68c5b5be0e1f667a96ca434";
let city = document.querySelector("#city-input");

function showTemperature(response) {
  let temp = Math.round(response.data.main.temp);
  let tempChange = document.querySelector("#celsius");
  let image = document.querySelector("#image");
  document.querySelector(
    "#humidity"
  ).innerHTML = `Humidity: ${response.data.main.humidity}%`;
  document.querySelector("#wind").innerHTML = `Wind: ${Math.round(
    response.data.wind.speed
  )} km/h`;
  tempChange.innerHTML = `${temp}°C`;
  image.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
}
let form = document.querySelector("form");
form.addEventListener("submit", getTemperature);

function getTemperature(event) {
  event.preventDefault();
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city.value}&appid=${apiKey}&units=metric`;
  axios.get(`${apiUrl}&appid=${apiKey}`).then(showTemperature);
}

// ------------------------------
// --- start fahrenheit
// ------------------------------
function fahrenheit(event) {
  event.preventDefault();
  let degrees = document.querySelector("#celsius");
  degrees.innerHTML = `87,8°F`;
}

let farForm = document.querySelector("#fahrenheit-link");
farForm.addEventListener("click", fahrenheit);

function celsius(event) {
  event.preventDefault();
  let degree = document.querySelector("#celsius");
  degree.innerHTML = `31°C`;
}

let celForm = document.querySelector("#celsius-link");
celForm.addEventListener("click", celsius);
// ------------------------------
// --- finish fahrenheit
// ------------------------------

function showTempButton(response) {
  let temp = Math.round(response.data.main.temp);
  let tempChange = document.querySelector("#celsius");
  let city = response.data.name;
  let cityIndicators = document.querySelector("#clear");
  let image = document.querySelector("#image");
  tempChange.innerHTML = `${temp}°C`;
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
  let apiKey = "1232f73dc68c5b5be0e1f667a96ca434";
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

searchCity("Kyiv");
