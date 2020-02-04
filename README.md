# Travel planner

## General information 

This is the fifth and final project of the Udacity Frontend nanodegree.This project is made using HTML,
CSS, Javascript and Webpack.It uses a service worker provided by google workbox webpack plugin.

The project allows the user to add data for his past/future trips.After entering the destination country and 
city (retrieved by calling the geonames API for the specific country), the system displays weather forecast for the start date of the trip via the Dark Sky API.When a trip is added to the list,it is stored in a JSON file and displayed on the application's initial page(My trips). A picture of the destination city/country is displayed next to the trip information by using the Pixabay API. If no picture is found, only the trip information is displayed

## Project installation 

To install the node modules needed by the project,you should run the following inside the project folder: 

```
npm install

```

## Starting the project 

After installation, you must create a .env file in the project root folder with the following content: 

```
APP_PORT=<backend port>
GEONAMES_USERNAME=<Geonames username>
PIXABAY_API_KEY=<Pixabay API Key>
DARK_SKY_API_KEY=<Dark Sky API key>
```

An example .env file content with the keys used in development: 

```

APP_PORT=8000
GEONAMES_USERNAME=rdemirov
PIXABAY_API_KEY=15024305-9dd9b9c466b23c7c749a41ce7
DARK_SKY_API_KEY=b8133274e58598bcd3625015835ecc69

```

The server is started with:

```
npm start

```

To build the frontend you should enter: 

```
npm run build-prod

```

## Using the project 

The application UI has 2 pages - "My trips" and "Add a trip".
On the "My trips" page , the user can view all his planned trips - past, present and future ones.
The "Add a trip" page contains a form allowing the user to add a new trip to the list.

## Implemented suggestions for expanding the project 

* Entering of optional end date and displaying the trip's duration 
* Allowing the user to enter multiple trips 