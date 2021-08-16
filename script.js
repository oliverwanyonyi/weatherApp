"use strict";
const form = document.querySelector("form");
const weatherContainer = document.querySelector(".container");
const countrylabel = document.querySelector(".location");
const errContainer = document.querySelector(".err-container");
form.addEventListener("submit", (e) => {
  e.preventDefault();
  const searchQuery = e.target.query.value;
  console.log(searchQuery);
  fetchWeatherInfo(searchQuery);
  form.reset();
  
});

const fetchWeatherInfo = (searchQuery) => {
  const key = "b1bac079db89b98cfca9ada52386002c";
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${searchQuery}&appid=${key}&units=metric;`;
  fetch(url)
    .then((res) => {
      if (res.ok) {
        return res.json();
      } else {
        throw new Error("Search for a valid city");
      }
    })
    .then((data) => weatherUi(data))
    .catch((err) => renderError(err));
};

const weatherUi = (data) => {
  const { main, name, sys, wind, weather } = data;
  const { temp, humidity } = main;
  const finaltemp = Math.round(temp - 273);
  console.log(data);
  const alphaCode = sys.country;
  const weatherDesc = weather[0].description;
  const speed = wind.speed;
  const date = new Date().toDateString();
  const icon = `https://openweathermap.org/img/wn/${weather[0]["icon"]}@2x.png`;
  countrylabel.innerText = ` Weather information for ${name}`;

  const html = `<div class="weather-app load">  <div class="day-details">
  <h1 class="alpha-code"> ${alphaCode}</h1>
  <h2 class="day">${date}</h2>
  <h2 class="condition">${weatherDesc}</h2>
  <span class="icon"><img src="${icon}" alt="" /></span>

</div>
<div class="info-wrapper">
  <div class="info">
  <span><i class="fas fa-wind"></i></span>
    <span>${speed} km/hr</span>
    <h2>wind</h2>
  </div>

  <div class="info">
  <span> <i class="fas fa-thermometer-three-quarters"></i></span>
    <span>${humidity} %</span>
    <h2>hum</h2>
  </div>

  <div class="info">
  <span><i class="fas fa-temperature-high"></i></span>
    <span>${finaltemp}<sup>o C</sup></span>
    <h2>temp</h2>
  </div>
</div></div>`;

  weatherContainer.insertAdjacentHTML("beforeend", html);
  weatherContainer.style.opacity = 1;
  document
    .querySelectorAll(".weather-app")
    .forEach((ui) => ui.classList.remove("load"));
};

const renderError = (err) => {
  console.log(err.message);
  const h1 = document.createElement("h1");
  h1.textContent = err.message;
  errContainer.insertAdjacentElement("beforeend", h1);
  setTimeout(() => {
    h1.remove();
  }, 3000);
};
