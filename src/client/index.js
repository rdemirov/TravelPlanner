import "./styles/reset.css";
import "./styles/base.css";
import moment from "moment";

let countriesList = {};
let citiesList = {};

export const renderTripsList = () => {
  console.log("TripsList");
  fetch(`http://localhost:${app_port}/getTrips`, {
    method: "GET"
  })
    .then(res => res.json())
    .then(function(res) {
      if (!res.error) {
        //         startDate: "2020-02-07"
        // endDate: "2020-02-28"
        // city:
        // lat: "-36.75818"
        // lng: "144.28024"
        // name: "Bendigo"
        // __proto__: Object
        // country:
        // flag: "https://restcountries.eu/data/aus.svg"
        // currencies: [{…}]
        // languages: [{…}]
        // timezones: (8) ["UTC+05:00", "UTC+06:30", "UTC+07:00", "UTC+08:00", "UTC+09:30", "UTC+10:00", "UTC+10:30", "UTC+11:30"]
        // latlng: (2) [-27, 133]
        // countryCode: "AU"
        // name: "Australia"
        console.log(res);
      } else alert(res.error);
    });
};
export const renderNewTripForm = () => {
  console.log("New Trip");
  fetch(`http://localhost:${app_port}/getCountries`, {
    method: "GET"
  })
    .then(res => res.json())
    .then(function(res) {
      if (!res.error) {
        countriesList = res;
        const countriesKeys = Object.keys(res);
        const countryDropdownElement = document.getElementById("country");
        for (let index = 0; index < countriesKeys.length; index++) {
          const option = document.createElement("option");
          option.setAttribute("value", countriesKeys[index]);
          option.textContent = countriesKeys[index];
          countryDropdownElement.appendChild(option);
        }
      } else alert(res.error);
    });
};

if (document.querySelector(".tripsList")) {
  renderTripsList();
} else renderNewTripForm();

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
            citiesList = res;
            const citiesKeys = Object.keys(res);
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

  fetch(`http://localhost:${app_port}/addTrip`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      startDate: startDateElement.value,
      endDate: endDateElement.value,
      city: { ...citiesList[cityElement.value], name: cityElement.value },
      country: {
        ...countriesList[countryElement.value],
        name: countryElement.value
      }
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
