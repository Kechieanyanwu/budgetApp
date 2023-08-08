const express = require("express");
const apiRouter = express();

// Top level api functionality lives here


// Return all envelopes i.e. GET e.g. / 
// Transfer amount from one envelop to another i.e PUT e.g. /transfer/:how to structure?


// Envelope-specific functionality, will move to subrouters
    // "/bills"
    // "/food"
    // "/transport"
    // "/shopping"
    // "/savings"
    // "/gifts"   

// Return a specific envelope i.e. GET e.g. /envelope
// Spend from a specific envelope i.e. PUT e.g. /envelope/spend/:amount
// Add to a specific envelope i.e. PUT e.g. /envelope/add/:amount
// Delete a specific envelope i.e. DELETE e.g. /envelope/delete

// Additional logic to come
// Seed envelopes based on income (to think through after making application)
// Create an envelope i.e. POST e.g. /new (to think through after making application)

module.exports = apiRouter;