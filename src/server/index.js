require("dotenv").config();
const fs = require("fs");
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const request = require("request");

const {
  DARK_SKY_API_KEY,
  APP_PORT,
  PIXABAY_API_KEY,
  GEONAMES_USERNAME
} = process.env;
const PORT = APP_PORT || 8000;
const COUNTRIES_API_URL = "https://restcountries.eu/rest/v2/all";

// Example Dark Sky URL : https://api.darksky.net/forecast/[key]/[latitude],[longitude]
const DARK_SKY_BASE_URL = `https://api.darksky.net/forecast/${DARK_SKY_API_KEY}/`;

//Example Pixabay URL : https://pixabay.com/api/?key=15024305-9dd9b9c466b23c7c749a41ce7&q=yellow+flowers&image_type=photo
const PIXABAY_URL = `https://pixabay.com/api/?key=${PIXABAY_API_KEY}`;

//Example Geonames URL: http://api.geonames.org/searchJSON?formatted=true&username=rdemirov&q=london&maxRows=10
const GEONAMES_URL = "http://api.geonames.org/searchJSON";

const app = express();

app.use(express.static("dist"));
app.use(cors());
app.use(bodyParser.json());

app.get("/", function(req, res) {
  res.sendFile("dist/index.html");
});

// designates what port the app will listen to for incoming requests
app.listen(PORT, function() {
  console.log(`Travel planner server listening on port ${PORT}`);
});

app.get("/getCountries", function(req, resp) {
  request(COUNTRIES_API_URL, { json: true }, (err, response) => {
    if (err) {
      throw err;
    }
    if (response && response.body) {
      const countriesData = {};
      const { body: countriesList } = response;
      for (let index = 0; index < countriesList.length; index++) {
        const {
          flag,
          name,
          currencies,
          languages,
          timezones,
          latlng,
          alpha2code
        } = countriesList[index];
        countriesData[name] = {
          flag,
          currencies,
          languages,
          timezones,
          latlng,
          alpha2code
        };
      }
      resp.send(countriesData);
    } else resp.send({});
  });
});

app.post("/listCities", function(req, resp) {
  const qs = {
    username: "rdemirov",
    country: req.body.countryCode,
    maxRows: 1000,
    fcode: "PPLA",
    fcode: "PPLC",
    fcode: "PPLA2",
    style: "SHORT"
  };
  request(GEONAMES_URL, { json: true, qs }, (err, response) => {
    if (err) {
      throw err;
    }
    if (
      response &&
      response.body &&
      response.body.geonames &&
      response.body.geonames.length
    ) {
      const { geonames: citiesList } = response.body;
      const citiesData = {};
      for (let index = 0; index < citiesList.length; index++) {
        const { name, lat, lng } = citiesList[index];
        citiesData[name] = { lat, lng };
      }
      resp.send(citiesData);
    } else
      resp.send({
        Any: {}
      });
  });
});
