const express = require("express");
const billsRouter = express();

//to include amount parameter verification

// Return a specific envelope i.e. GET e.g. /envelope
billsRouter.get("/", (req, res, next) => {
    // return amount in envelope
    // what shape should this take? JSON object?
});

// Spend from a specific envelope i.e. PUT e.g. /envelope/spend/:amount
billsRouter.put("/spend/:amount", (req, res, next) => {
    // return amount in envelope
    // what shape should this take? JSON object?
});


// Add to a specific envelope i.e. PUT e.g. /envelope/add/:amount
// Delete a specific envelope i.e. DELETE e.g. /envelope/delete


module.exports = billsRouter;