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
let timeMin = currentTime.getMinutes();
change.innerHTML = `Today is ${currentDay}, ${timeHour}:${timeMin}`;

function showCity(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#city-input");
  let cityIndicators = document.querySelector("#clear");
  cityIndicators.innerHTML = `Clear in ${cityInput.value}`;
}
let cityForm = document.querySelector("#city-form");
cityForm.addEventListener("submit", showCity);

let apiKey = "1232f73dc68c5b5be0e1f667a96ca434";
let city = document.querySelector("#city-input");

function showTemperature(response) {
  let temp = Math.round(response.data.main.temp);
  let tempChange = document.querySelector("#celsius");
  tempChange.innerHTML = `☀ ${temp}°C`;
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
  degrees.innerHTML = `☀  87,8°F`;
}

let farForm = document.querySelector("#fahrenheit-link");
farForm.addEventListener("click", fahrenheit);

function celsius(event) {
  event.preventDefault();
  let degree = document.querySelector("#celsius");
  degree.innerHTML = `☀  31°C`;
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
  tempChange.innerHTML = `☀ ${temp}°C`;
  cityIndicators.innerHTML = `Clear in ${city}`;
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
