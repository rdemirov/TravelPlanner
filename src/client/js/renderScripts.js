import moment from "moment";
export let countriesList = {};

export const renderTripDetails = tripDetails => {
  const { startDate, endDate, city, country, weather, countdown } = tripDetails;
  let momentStartDate = moment(startDate);
  let durationString = "",
    countdownString = "",
    endDateString = "";
  let imageParameter;
  if (city === "Any") imageParameter = country;
  else imageParameter = city;
  fetch(`http://localhost:${app_port}/getDestinationPhoto`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      city: imageParameter,
      country
    })
  })
    .then(res => res.json())
    .then(function(res) {
      if (!res.error) {
        let countdownMessage;
        if (countdown > 0) {
          countdownMessage = `You have ${countdown} days until departure`;
        } else if (countdown === 0) {
          countdownMessage = `Your trip is today`;
        } else countdownMessage = `<strong>Trip expired</strong>`;
        countdownString = `<p id="countdown">${countdownMessage}</p>`;
        if (endDate) {
          endDateString = `&nbsp;&nbsp;<span class="infoLabel">End Date:  </span class="infoLabel">${endDate}`;
          let momentEndDate = moment(endDate);
          durationString = `<p id="duration"><span class="infoLabel">Duration: </span> <span id="tripDuration">${momentEndDate.diff(
            momentStartDate,
            "days"
          )} days</span></p>`;
        }
        const tripsListRoot = document.querySelector(".tripsList");
        const tripItemRoot = document.createElement("div");
        tripItemRoot.setAttribute("id", "tripDetailsContainer");
        if (res.img) {
          const figureRoot = document.createElement("div");
          const figure = document.createElement("figure");
          const cityImage = document.createElement("img");
          cityImage.setAttribute("src", res.img);
          cityImage.setAttribute("alt", city);
          const figCaption = document.createElement("figcaption");
          figCaption.textContent = `${country}, ${city}`;
          figure.appendChild(cityImage);
          figure.appendChild(figCaption);
          figureRoot.appendChild(figure);
          tripItemRoot.appendChild(figureRoot);
        }
        const tripInformationRoot = document.createElement("div");
        tripInformationRoot.className = "tripInformation";
        tripInformationRoot.innerHTML = `<p id="countryData">${city}, ${country}</p>
              <p id="tripDates"><span class="infoLabel">Start date:  </span>${startDate}${endDateString}</p>
              ${durationString}
              ${countdownString}
              <p id="weather">${weather}</p>`;
        tripItemRoot.appendChild(tripInformationRoot);
        tripsListRoot.appendChild(tripItemRoot);
      } else alert(res.error);
    });
};

export const renderTripsList = () => {
  fetch(`http://localhost:${app_port}/getTrips`, {
    method: "GET"
  })
    .then(res => res.json())
    .then(function(tripsData) {
      if (!tripsData.error) {
        if (tripsData && tripsData.length) {
          let countdown;
          const currentDate = moment(new Date());
          const tripsWithCountdown = tripsData.map(tripData => {
            const { startDate } = tripData;
            countdown = moment(startDate).diff(currentDate, "days");
            tripData.countdown = countdown;
            return tripData;
          });
          for (let index = 0; index < tripsWithCountdown.length; index++) {
            renderTripDetails(tripsWithCountdown[index]);
          }
        } else {
          const tripsListRoot = document.querySelector(".tripsList");
          tripsListRoot.innerHTML = "<p class='noTrips'> No trips planned</p>";
        }
      } else alert(res.error);
    });
};

export const renderNewTripForm = () => {
  fetch(`http://localhost:${app_port}/getCountries`, {
    method: "GET"
  })
    .then(res => res.json())
    .then(function(res) {
      if (!res.error) {
        countriesList = res;
        const startDateElement = document.getElementById("startDate");
        startDateElement.value = moment(new Date()).format("YYYY-MM-DD");
        const countryDropdownElement = document.getElementById("country");
        const countriesKeys = Object.keys(res);
        const defaultOption = document.createElement("option");
        defaultOption.setAttribute("value", null);
        defaultOption.textContent = "";
        countryDropdownElement.appendChild(defaultOption);
        for (let index = 0; index < countriesKeys.length; index++) {
          const option = document.createElement("option");
          option.setAttribute("value", countriesKeys[index]);
          option.textContent = countriesKeys[index];
          countryDropdownElement.appendChild(option);
        }
      } else alert(res.error);
    });
};
