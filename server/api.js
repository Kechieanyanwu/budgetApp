const express = require("express");
const apiRouter = express();
const billsRouter = require("./bills");
const foodRouter = require("./food");


// Top level api functionality lives here

// Return all envelopes i.e. GET e.g. /
apiRouter.get("/", (req, res, next) => {
    //return all envelopes
}) 

apiRouter.put("/transfer", (req, res, next) => {
    // Transfer amount from one envelop to another i.e PUT e.g. /transfer/:how to structure?
    // Do I make this using request params or using query params? Might be query so I can do
    // source = envelope, destination = envelope, and amount = int
    // feel like there would either be specific middleware for this function, or I call the specific end points? 
        // probably the former 
})



// Envelope-specific functionality, will move to subrouters. To start with bills and transport and will include others 
// once functionality has been finalised

// "/bills"
apiRouter.use("/bills", billsRouter);
// "/food"
apiRouter.use("/food", foodRouter);
// "/transport"
// "/shopping"
// "/savings"
// "/gifts"   



// Additional logic to come
// Seed envelopes based on income (to think through after making application)
// Create an envelope i.e. POST e.g. /new (to think through after making application)

module.exports = apiRouter;