require("dotenv").config();
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const PORT = process.env.APP_PORT || 8000;

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

app.post("/test", function(req, resp) {
  res.send("Test");
});
