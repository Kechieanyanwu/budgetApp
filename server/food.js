const express = require("express");
const foodRouter = express();

// Return a specific envelope i.e. GET e.g. /envelope
// Spend from a specific envelope i.e. PUT e.g. /envelope/spend/:amount
// Add to a specific envelope i.e. PUT e.g. /envelope/add/:amount
// Delete a specific envelope i.e. DELETE e.g. /envelope/delete


module.exports = foodRouter;