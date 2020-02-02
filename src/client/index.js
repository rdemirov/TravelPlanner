import "./styles/reset.css";
import "./styles/base.css";
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
