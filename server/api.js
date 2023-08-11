const express = require("express");
const apiRouter = express();
const {Envelope,
    createNewEnvelope,
    getEnvelopeByName,
    getAllEnvelopes,} = require("../logic"); // to be updated as I create additional functions in logic.js


//Middleware for validating new Envelope details
const validateNewEnvelopeDetails = (req, res, next) => {
    console.log(JSON.stringify(req.body)) //test
    if (req.body.name) { // If the required envelope keys exist. Name MUST be present as we can start an envelope with 0 balance
        req.name = String(req.body.name); 
        req.balance = req.body.balance || undefined; // test that this works properly 
        next();
    } else {
    const err = new Error("New Envelope must have a name.");
    err.status = 400;
    next(err);
    }
};


apiRouter.param("envelope", (req, res, next, envelope) => {
    let foundEnvelope;
    const envelopeName = envelope;

    if (envelopeName) {
        try {
            foundEnvelope = getEnvelopeByName(String(envelopeName).toLowerCase());
        } catch (err) {
            next(err);
            return;
        }
        req.envelope = foundEnvelope;
        next();
    } else {
        const err = new Error("Please include an Envelope name.");
        err.status = 400;
        next(err);
        }
})



// Create an envelope
apiRouter.post("/create", validateNewEnvelopeDetails, (req, res, next) => {
    const newEnvelope = createNewEnvelope(req.name, req.balance);
    res.status(201).send(newEnvelope);
})

// Return all envelopes 
apiRouter.get("/", (req, res, next) => {
    res.status(200).send(getAllEnvelopes());
});

// Return specific envelope 
apiRouter.get("/:envelope", (req, res, next) => {
    res.status(200).send(req.envelope);
});

// Spend from a specific envelope
apiRouter.put("/spend", (req, res, next) => {
    //check that envelope and amount is there i.e. create middleware for both spend and envelope 
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
});

const errorHandler = (err, req, res, next) => {
    res.status(err.status).send(err.message);
};

apiRouter.use(errorHandler);

module.exports = apiRouter;


// include input validation e.g. for amount
// include error handling for thrown errors from logic.js
// Ensure "Envelope" is spelled correctly everywhere. NOT "ENVELOP"
// to create tests!!