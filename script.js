

const apiKey = "d8e9f10dbc2b909b3d6242f0aae0c172";
const weather = document.querySelector(".weather");
const searchBar = document.querySelector(".search-bar");

function fetchWeather(city) {
  fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`)
    .then(response => response.json())
    .then(data => {
      displayWeather(data);
    })
    .catch(() => {
      alert("City not found!");
    });
}

function displayWeather(data) {
  const { name } = data;
  const { icon, description } = data.weather[0];
  const { temp, humidity } = data.main;
  const { speed } = data.wind;

  weather.innerHTML = `
    <h2 class="city">Weather in ${name}</h2>
    <h1 class="temp">${temp.toFixed(1)}°C</h1>
    <div class="flex">
      <img src="https://openweathermap.org/img/wn/${icon}.png" alt="" class="icon" />
      <div class="description">${description}</div>
    </div>
    <div class="humidity">Humidity: ${humidity}%</div>
    <div class="wind">Wind speed: ${speed.toFixed(2)} km/h</div>
  `;
}

document.querySelector("button").addEventListener("click", () => {
  const city = searchBar.value.trim();
  if (city) {
    fetchWeather(city);
  }
});

// Default city on load
fetchWeather("Beirut");
