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

// ------------------------------
// --- start displayWeatherCondition
// ------------------------------
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
  //console.log(response);
}

function basicCity(city) {
  let apiKey = "1232f73dc68c5b5be0e1f667a96ca434";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeatherCondition);
}

basicCity("Kyiv");
// ------------------------------
// --- end displayWeatherCondition
// ------------------------------

// ------------------------------
// --- start searchCity
// ------------------------------
function searchCity(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#city-input");
  let cityIndicators = document.querySelector("#clear");
  let apiKey = "1232f73dc68c5b5be0e1f667a96ca434";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityInput.value}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeatherCondition);
  cityIndicators.innerHTML = `Clear in <strong> ${cityInput.value} </strong>`;
}
let cityForm = document.querySelector("#city-form");
cityForm.addEventListener("submit", searchCity);

// ------------------------------
// --- end searchCity
// ------------------------------

// ------------------------------
// --- start fahrenheit
// ------------------------------

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
// ------------------------------
// --- finish fahrenheit
// ------------------------------

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
