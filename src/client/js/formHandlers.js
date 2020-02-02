import { countriesList } from "./renderScripts";
import { getData, postData } from "./helpers";

let citiesList = {};

export const handleDropdownChange = event => {
  const { value: selectedValue } = event.target;
  switch (event.target.id) {
    case "city":
      console.log("city");
      break;
    case "country":
      const cityDropdownElement = document.getElementById("city");
      cityDropdownElement.disabled = false;
      while (cityDropdownElement.firstChild) {
        cityDropdownElement.removeChild(cityDropdownElement.firstChild);
      }
      fetch(`http://localhost:${app_port}/listCities`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          countryCode: countriesList[selectedValue].countryCode
        })
      })
        .then(res => res.json())
        .then(function(res) {
          if (!res.error) {
            const countryData = countriesList[selectedValue];
            let citiesUnsorted = Object.keys(res);
            if (
              citiesUnsorted &&
              citiesUnsorted.length === 1 &&
              citiesUnsorted[0] === "Any"
            ) {
              res["Any"].lat = countryData.lat;
              res["Any"].lng = countryData.lng;
            }
            citiesList = res;
            console.log(citiesList);
            let citiesKeys = citiesUnsorted.sort(function(a, b) {
              if (a < b) return -1;
              else if (a > b) return 1;
              return 0;
            });
            console.log(res);
            for (let index = 0; index < citiesKeys.length; index++) {
              const option = document.createElement("option");
              option.setAttribute("value", citiesKeys[index]);
              option.textContent = citiesKeys[index];
              cityDropdownElement.appendChild(option);
            }
          } else alert(res.error);
        });
      break;
  }
};

export const handleSubmit = event => {
  const startDateElement = document.getElementById("startDate");
  const endDateElement = document.getElementById("endDate");
  const cityElement = document.getElementById("city");
  const countryElement = document.getElementById("country");
  const weatherElement = document.getElementById("weather");

  fetch(`http://localhost:${app_port}/addTrip`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      startDate: startDateElement.value,
      endDate: endDateElement.value,
      city: cityElement.value,
      country: countryElement.value,
      weather: weatherElement.textContent
    })
  }).then(res => res);
};

export const handleReset = event => {
  const startDateElement = document.getElementById("startDate");
  const endDateElement = document.getElementById("endDate");
  const cityElement = document.getElementById("city");
  const countryElement = document.getElementById("country");
  countryElement.value = null;
  cityElement.value = null;
  while (cityElement.firstChild) {
    cityElement.removeChild(cityElement.firstChild);
  }
  startDateElement.value = moment(new Date()).format("YYYY-MM-DD");
  endDateElement.value = moment(new Date()).format("YYYY-MM-DD");
};

export const handleStartDateChange = event => {
  const startDate = event.target.value;
  const cityDropdownElement = document.getElementById("city");
  const selectedCity = citiesList[cityDropdownElement.value];
  const { lat, lng } = selectedCity;
  fetch(`http://localhost:${app_port}/getWeatherForecast`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      forecastDate: startDate,
      lat,
      lng
    })
  })
    .then(res => res.json())
    .then(res => {
      const { summary, temperatureLow, temperatureHigh } = res;
      const weatherData = document.getElementById("weatherData");
      weatherData.innerHTML = `<p id="weather">${summary} Temperature ${Math.round(
        temperatureLow
      )} - ${Math.round(temperatureHigh)} degrees</p>`;
    });
};
