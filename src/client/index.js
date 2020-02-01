import "./styles/reset.css";
import "./styles/base.css";

export const renderTripsList = () => {
  console.log("TripsList");
};
export const renderNewTripForm = () => {
  console.log("New Trip");
  fetch(`http://localhost:${app_port}/getCountries`, {
    method: "GET"
  })
    .then(res => res.json())
    .then(function(res) {
      if (!res.error) {
        const countriesList = Object.keys(res);
        const countryDropdownElement = document.getElementById("country");
        for (let index = 0; index < countriesList.length; index++) {
          const option = document.createElement("option");
          option.setAttribute("value", countriesList[index]);
          option.textContent = countriesList[index];
          countryDropdownElement.appendChild(option);
        }
      } else alert(res.error);
    });
};

if (document.querySelector(".tripsList")) {
  renderTripsList();
} else renderNewTripForm();

export const handleDropdownChange = event => {
  console.log(event.target.id);
};
