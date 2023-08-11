const express = require("express");
const apiRouter = express();
const {Envelope} = require("./logic"); // to be updated as I create additional functions 

// include input validation e.g. for amount
// include validation that envelope exists 
// include error handling for thrown errors from logic.js
// Ensure "Envelope" is spelled correctly everywhere. NOT "ENVELOP"


// Top level api functionality lives here

//create middleware for validating inputs
const validateEnvelopeDetails = (req, res, next) => {
    if (req.body.name && req.body.balance) {
        req.name = req.body.name;
        req.balance = req.body.balance;

    } else {
        const err = new Error("New Envelope must have")
    }

    //check if you have both req.name and req.balance
        //if no, next(err)
    //if yes, attach to req
        //call next()
};

// Create an envelope
apiRouter.post("/create", (req, res, next) => {
    //include request body validation 
    const newEnvelope = new Envelope() // name and balance should be in request body and to include parameters
    //createEnvelope function 
        //return created envelope
})

// Return all envelopes 
apiRouter.get("/", (req, res, next) => {
    // return all envelopes
    // what will the shape of the return value be? An object? An array of objects? I think the later 
});

// Return specific envelope 
apiRouter.get("/:envelope", (req, res, next) => {
    // should be in shape of an object, i.e. Envelope.info()
});

// Spend from a specific envelope
apiRouter.put("/spend/:envelope", (req, res, next) => {
    // perhaps in request body, will include the amount to be spent? Or should this be in query param?
});

// Add to a specific envelope
apiRouter.put("/add/:envelope", (req, res, next) => {
    // perhaps in request body, will include the amount to be added? Or should this be in query param?
});

// Transfer between envelopes
apiRouter.put("/transfer", (req, res, next) => {
    // Transfer amount from one envelop to another i.e PUT e.g. /transfer/:how to structure?
    // Do I make this using query params? Might be query so I can do ?source = envelope, destination = envelope, and amount = int
    // Or should this be in request body? 
    // feel like there should be specific middleware for this function? 
    // Logic is just add to one balance, spend from another balance. Boom - Transfer. 
});

apiRouter.delete("/:envelope", (req, res, next) => {
    // delete specific envelope
})



module.exports = apiRouter;