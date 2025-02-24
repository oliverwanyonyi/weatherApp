"use strict";

if ("serviceWorker" in navigator) {
  navigator.serviceWorker
    .register("sw.js")
    .then((registration) => {
      console.log("sw registered ");
      console.log(registration);
    })
    .catch((err) => console.log(err));
}

const form = document.querySelector("form");
const weatherContainer = document.querySelector(".container");
const countrylabel = document.querySelector(".location");
const errContainer = document.querySelector(".err-container");
const loader = document.querySelector(".loader");
form.addEventListener("submit", (e) => {
  e.preventDefault();

  const searchQuery = e.target.query.value;
  console.log(searchQuery);
  if (searchQuery === "") return;
  loader.classList.add("active");
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
        loader.classList.remove("active");
        throw new Error(`${searchQuery} not found !`);
      }
    })
    .then((data) => weatherUi(data))
    .catch((err) => {
      loader.classList.remove("active");
      renderError(err);
    });
};

const weatherUi = (data) => {
  loader.classList.remove("active");
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

  const html = `<div class="weather-app">
  
  
  
  <div class="day-details">
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

  weatherContainer.innerHTML = html
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
