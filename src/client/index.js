import "./styles/reset.css";
import "./styles/base.css";
import "./styles/header.css";
import "./styles/tripInformation.css";
import "./styles/newTrip.css";
import "./styles/footer.css";
import { renderTripsList, renderNewTripForm } from "./js/renderScripts";
import {
  handleSubmit,
  handleReset,
  handleDropdownChange,
  handleStartDateChange
} from "./js/formHandlers";
import moment from "moment";

if (document.querySelector(".tripsList")) {
  renderTripsList();
} else renderNewTripForm();

export {
  handleSubmit,
  handleReset,
  handleDropdownChange,
  handleStartDateChange
};
