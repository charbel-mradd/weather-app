const apiKey = "f43a94db3bb97a18d8b3cce9c542e8dc";
const unsplashKey = "SDSSqp5l6g2sUVKcLODwrHHJrs3shrLMiTrFkwl-j9M";
const weather = document.querySelector(".weather");
const searchBar = document.querySelector(".search-bar");
const body = document.body; 

function fetchWeather(city) {
  fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`)
    .then(response => response.json())
    .then(data => {
      displayWeather(data);
      fetchCityImage(city); // Fetch city image after weather data
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

function fetchCityImage(city) {
  fetch(`https://api.unsplash.com/search/photos?query=${city}&client_id=${unsplashKey}`)
    .then(response => response.json())
    .then(data => {
      if (data.results.length > 0) {
        const imageUrl = data.results[0].urls.full; // Get first image result
        body.style.background = `url(${imageUrl}) no-repeat center center/cover`; // Set as background
      }
    })
    .catch(() => {
      console.log("Image not found for this city.");
    });
}

document.querySelector("button").addEventListener("click", () => {
  const city = searchBar.value.trim();
  if (city) {
    fetchWeather(city);
  }
});

// Default city on load
fetchWeather("Beirut");
