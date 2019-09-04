const express = require("express");
const routes = require('./routes');
const app = express();



// Error class
class ExpressError extends Error {
  constructor(message, status) {
    super();
    this.message = message;
    this.status = status;
    console.error(this.stack);
  }
}
// for processing JSON:
app.use(express.json());

// routes 
app.use("/items", routes);
// end routes

// Global Error Handler
app.use(function(err, req, res, next) {
  // the default status is 500 Internal Server Error
  let status = err.status || 500;
  let message = err.message;

  // set the status and alert the user
  return res.status(status).json({
    error: { message, status }
  });
});


// Listener
app.listen(3000, function() {
  console.log("App on port 3000");
});

