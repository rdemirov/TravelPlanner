require("dotenv").config();
const app = require("./server");

const { APP_PORT = 8000 } = process.env;

// designates what port the app will listen to for incoming requests
app.listen(APP_PORT, function() {
  console.log(`Travel planner server listening on port ${APP_PORT}`);
});
