let city = document.querySelector("#city");
let inputButton = document.getElementById("button-input");
let input = document.querySelector("#input");
let temperature = document.getElementById("temp");
let date = document.querySelector("#date");
let weatherState = document.querySelector("#weather-state");
let windSpeed = document.querySelector("#wind-speed");
let iconWeatherState = document.querySelector("#icon-weather-state");
let currentButton = document.querySelector("#current-button");
let celsius = document.querySelector(".celsius");
let farenheit = document.querySelector(".farenheit");
const API_KEY = "c03face7caa58a9b7ffa9f52b7238a93";
const API_CURRENT_LOCATION = function (lat, lon) {
  return `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`;
};
const BASE_URL = function (city) {
  return `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`;
};
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

inputButton.addEventListener("click", (event) => {
  event.preventDefault();
  let inputCapitalized =
    input.value.trim().charAt(0).toUpperCase() + input.value.slice(1);
  getData(inputCapitalized);
  input.value = "";
});

const node = document.getElementsByClassName("form-control")[0];
node.addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    event.preventDefault();
    let inputCapitalized =
      input.value.trim().charAt(0).toUpperCase() + input.value.slice(1);
    getData(inputCapitalized);
    input.value = "";
  }
});

date.innerHTML = formatDate();

currentButton.addEventListener("click", (event) => {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(getLocationData);
});
function getData(input) {
  axios.get(BASE_URL(input)).then((response) => {
    //console.log(JSON.stringify(response))
    city.innerHTML = input;
    let temp = Math.round(response.data.main.temp);
    temperature.innerHTML = `${temp}°`;
    weatherState.innerHTML = response.data.weather[0].description;
    windSpeed.innerHTML = `Wind speed: ${response.data.wind.speed}m/s`;
    iconWeatherState.src = `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`;
    celsius.style.color = "blue";
    farenheit.style.color = "black";
  });
}
function getLocationData(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  axios.get(API_CURRENT_LOCATION(lat, lon)).then((response) => {
    city.innerHTML = response.data.name;
    let temp = Math.round(response.data.main.temp);
    temperature.innerHTML = `${temp}°`;
    weatherState.innerHTML = response.data.weather[0].description;
    iconWeatherState.src = `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`;
  });
}
function formatDate() {
  let now = new Date();
  return ` ${days[now.getDay()]}, ${now.getHours()}:${now.getMinutes()}`;
}

window.onload = function () {
  getData("Paris");
};

function celsiusToFarenheit(temp) {
  return Math.round(temp * 1.8 + 32);
}

function farenheitToCelsius(temp) {
  return Math.round((temp - 32) * 0.56);
}

celsius.addEventListener("click", () => {
  celsius.style.color = "blue";
  farenheit.style.color = "black";
  let temp = temperature.innerHTML.slice(0, -1);
  let farenheitTemp = farenheitToCelsius(temp);
  temperature.innerHTML = `${farenheitTemp}°`;
});

farenheit.addEventListener("click", () => {
  celsius.style.color = "black";
  farenheit.style.color = "blue";
  let temp = temperature.innerHTML.slice(0, -1);
  let celsiusTemp = celsiusToFarenheit(temp);
  temperature.innerHTML = `${celsiusTemp}°`;
});
