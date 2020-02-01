export let countriesList = {};

export const renderTripDetails = tripDetails => {
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
  //     <div id="tripDetailsContainer">
  //     <div>
  //         <figure>
  //             <img src="" alt="prague" />
  //             <figcaption>Prague, Czech Republic</figcaption>
  //         </figure>
  //     </div>
  //     <div class="tripInformation">
  //         <p id="countryData">Prague, Czech Republic</p>
  //         <p id="tripDates"><span class="infoLabel">Start date:</span> 2020-02-01   <span class="infoLabel">End Date:</span class="infoLabel"> 2020-02-10</p>
  //         <p id="duration"><span class="infoLabel">Duration: </span> 9 days</p>
  //         <p id="countdown">1 day until your trip</p>
  //         <p>Cloudy</p>
  //     </div>
  // </div>
};

export const renderTripsList = () => {
  console.log("TripsList");
  fetch(`http://localhost:${app_port}/getTrips`, {
    method: "GET"
  })
    .then(res => res.json())
    .then(function(tripsData) {
      if (!tripsData.error) {
        for (let index = 0; index < tripsData.length; index++) {
          renderTripDetails(tripsData[index]);
        }
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
