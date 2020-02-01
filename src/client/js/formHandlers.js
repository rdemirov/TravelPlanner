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
            citiesList = res;
            let citiesUnsorted = Object.keys(res);
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
  const countriesList = localStorage.getItem("countriesList", countriesList);
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
