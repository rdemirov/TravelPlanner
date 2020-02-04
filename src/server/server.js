require("dotenv").config();
const fs = require("fs");
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const request = require("request");
const moment = require("moment");

const {
  DARK_SKY_API_KEY, // b8133274e58598bcd3625015835ecc69
  PIXABAY_API_KEY, // 15024305-9dd9b9c466b23c7c749a41ce7
  GEONAMES_USERNAME // rdemirov
} = process.env;

const app = express();

app.use(express.static("dist"));
app.use(cors());
app.use(bodyParser.json());

app.get("/", function(req, res) {
  res.sendFile("dist/index.html", { root: "." });
});

app.get("/newTrip", function(req, res) {
  res.sendFile("dist/newTrip.html", { root: "." });
});

app.get("/getCountries", function(req, resp) {
  const COUNTRIES_API_URL = "https://restcountries.eu/rest/v2/all";
  request(COUNTRIES_API_URL, { json: true }, (err, response) => {
    if (err) {
      resp.send({
        error: "Error fetching countries!.Please try again later"
      });
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
          alpha2Code
        } = countriesList[index];
        countriesData[name] = {
          flag,
          currencies,
          languages,
          timezones,
          lat: latlng[0],
          lng: latlng[1],
          countryCode: alpha2Code
        };
      }
      resp.send(countriesData);
    } else resp.send({});
  });
});

app.post("/listCities", function(req, resp) {
  //Example Geonames URL: http://api.geonames.org/searchJSON?formatted=true&username=rdemirov&q=london&maxRows=10
  const GEONAMES_URL = "http://api.geonames.org/searchJSON";
  const qs = {
    username: GEONAMES_USERNAME || "rdemirov",
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

app.post("/addTrip", function(req, res) {
  let storedTrips = fs.readFileSync(__dirname + "/storage/trips.json");
  let tripsData = JSON.parse(storedTrips);
  if (!tripsData.trips) tripsData.trips = [];
  tripsData.trips.push(req.body);
  fs.writeFileSync(
    __dirname + "/storage/trips.json",
    JSON.stringify(tripsData)
  );
  res.send({
    success: true
  });
});

app.get("/getTrips", function(req, res) {
  let storedTrips = fs.readFileSync(__dirname + "/storage/trips.json");
  let tripsData = JSON.parse(storedTrips);
  res.send(tripsData.trips);
});

app.post("/getWeatherForecast", function(req, res) {
  const { forecastDate, lat, lng } = req.body;
  const requestDate = moment(forecastDate).format("YYYY-MM-DDTHH:mm:ssZ");
  const DARK_SKY_BASE_URL = `https://api.darksky.net/forecast/${DARK_SKY_API_KEY}/${lat},${lng},${requestDate}`;
  const qs = {
    exclude: "currently,flags,minutely,hourly",
    units: "si"
  };
  request(DARK_SKY_BASE_URL, { json: true, qs }, (err, response) => {
    if (err) {
      throw err;
    }
    if (
      response &&
      response.body &&
      response.body.daily &&
      response.body.daily.data &&
      response.body.daily.data.length
    ) {
      const dailyForecast = response.body.daily.data[0];
      const { summary, temperatureHigh, temperatureLow } = dailyForecast;
      res.send({ summary, temperatureHigh, temperatureLow });
    } else res.send({});
  });
});

app.post("/getDestinationPhoto", function(req, res) {
  const { city, country } = req.body;
  const PIXABAY_URL = `https://pixabay.com/api/`;
  const qs = {
    key: PIXABAY_API_KEY,
    image_type: "photo",
    q: `${city}|${country}`
  };
  request(PIXABAY_URL, { json: true, qs }, (err, response) => {
    if (err) {
      throw err;
    }
    if (
      response &&
      response.body &&
      response.body.hits &&
      response.body.hits.length &&
      response.body.hits[0].previewURL
    ) {
      res.send({ img: response.body.hits[0].previewURL });
    } else res.send({});
  });
});

module.exports = app;
