const express = require("express");
const apiRouter = express();
const {Envelope,
    createNewEnvelope,
    getEnvelopeByName,
    getAllEnvelopes,
    spendFromEnvelope,
    addToEnvelope,
    transferFromEnvelope,
    deleteEnvelope,} = require("../logic"); // to be updated as I create additional functions in logic.js


//Middleware for validating new Envelope details
const validateNewEnvelopeDetails = (req, res, next) => {
    console.log(JSON.stringify(req.body)) //test
    if (req.body.name) { // If the required envelope keys exist. Name MUST be present as we can start an envelope with 0 balance
        req.name = String(req.body.name).toLowerCase(); 
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
    console.log(envelopeName); //test

    if (envelopeName) {
        try {
            foundEnvelope = getEnvelopeByName(String(envelopeName).toLowerCase());
        } catch (err) {
            next(err);
            return;
        }
        req.envelope = foundEnvelope.info();
        next();
    } else {
        const err = new Error("Please include an Envelope name.");
        err.status = 400;
        next(err);
        }
})



const validateUpdatedEnvelopeDetails = (req, res, next) => {

    console.log("You have hit the validate updated envelope details endpoint") //test
    console.log(req.body); //test
    if (req.body.name && req.body.amount) { // Checks if there is an envelope name and amount to change by
        let foundEnvelope;
        if (typeof req.body.name === "string" && typeof req.body.amount === "number") { // Type validation
            console.log(typeof req.body.name === "string"); //test
            console.log(typeof req.body.amount === "number"); //test
            if (req.body.amount > 0) { // Checks that the amount is greater than 0 
                try {
                    console.log("Amount is greater than 0"); //test
                    foundEnvelope = getEnvelopeByName(String(req.body.name).toLowerCase()); //might be able to take out the string cus it already validates that its a string
                    console.log("Test that found envelope" + JSON.stringify(foundEnvelope)); //test
                } catch (err) {
                    console.log("There's an error somehow!!") //test
                    next(err);
                    return;
                }
                console.log("Test 2: " + foundEnvelope); //test
                console.log("Test 2.1: " + req.body.amount); //test
                req.envelope = foundEnvelope; //next would be to log found envelope byt should be the same. Remove comment after
                req.amount = req.body.amount;
                console.log(req.envelope); //test THIS SHOWS THAT REQ.ENVELOPE RETURNS AN ENVELOPE NOT AN OBJECT IF YOU CONSOLE.LOG IT
                console.log(req.envelope instanceof Envelope); //test THIS SHOWS THAT REQ.ENVELOPE RETURNS AN ENVELOPE NOT AN OBJECT IF YOU CONSOLE.LOG IT
                console.log(req.amount); //test
                next();
            } else {
                const err = new Error("Amount must be greater than 0.");
                err.status = 400;
                next(err);
            }
        } else {
            const err = new Error("Envelope name must be a string and the Amount must be an integer greater than 0.");
            err.status = 400;
            next(err);
        }
    } else {
        const err = new Error("You must include an envelope Name and Amount to change the envelope balance by.");
        err.status = 400;
        next(err);
    }
}
 


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
apiRouter.put("/spend", validateUpdatedEnvelopeDetails, (req, res, next) => {
    //include validation that amount is not greater than balance if spent
    console.log(req.envelope.name); //test
    console.log(req.amount); //test
    const updatedEnvelope = spendFromEnvelope(req.envelope, req.amount); //enters here
    console.log("Updated Envelope" + updatedEnvelope); //test
    res.status(200).send(updatedEnvelope);
});

// Add to a specific envelope
apiRouter.put("/add", validateUpdatedEnvelopeDetails, (req, res, next) => {
    // perhaps in request body, will include the amount to be added? Or should this be in query param?
    console.log("You have reached the add to envelope endpoint"); //test
    console.log("Envelope is " + req.envelope); //test
    console.log("Amount is " + req.amount); //test
    const updatedEnvelope = addToEnvelope(req.envelope, req.amount);
    console.log("Updated Envelope" + updatedEnvelope); //test
    res.status(200).send(updatedEnvelope);
});



apiRouter.put("/transfer", (req, res, next) => { // doing all validation in transfer because only time needed
    if (req.body.source && req.body.destination && req.body.amount) {
        console.log("There is a source, dest, and amount"); //test
        if (typeof req.body.source === "string" && typeof req.body.destination === "string" && typeof req.body.amount === "number" && req.body.amount > 0) {
            let foundSrcEnvelope;
            let foundDestEnvelope;
            try {
                foundSrcEnvelope = getEnvelopeByName(String(req.body.source).toLowerCase()); // issue lies in the object being returned, not the envelope
                foundDestEnvelope = getEnvelopeByName(String(req.body.destination).toLowerCase());
                console.log("foundSrcEnvelope: " + JSON.stringify(foundSrcEnvelope)); //test
                console.log(foundSrcEnvelope); //test
                console.log("Is it true " + (foundSrcEnvelope instanceof Envelope)); //test
            } catch(err) {
                next(err);
                return;
            }
            //call transfer method
            console.log("You are about to go into the Spend and ADD methods") //test
            console.log(foundSrcEnvelope); //test
            console.log(foundDestEnvelope); //test
            const completedTransfer = transferFromEnvelope(foundSrcEnvelope, foundDestEnvelope, req.body.amount);
            console.log(JSON.stringify("Completed Transfer: " + completedTransfer)); //test
            res.status(200).send(JSON.stringify(completedTransfer));
        } else {
            const err = new Error("Envelope names must be a string, amount must be a number greater than 0.");
            err.status = 400; 
            next(err);
        }
    } else {
        const err = new Error("Please include a source envelope, a destination envelope, and an positive, non-zero amount to be transferred between the two.");
        err.status = 400; 
        next(err);
    }
});

apiRouter.delete("/delete/:envelope", (req, res, next) => {
    console.log("DELETED ROUTE") //test
    console.log(req.envelope); //test
    const deleted = deleteEnvelope(req.envelope);
    if (deleted) {
        res.status(204).send();
    } else {
        const err = new Error("Internal Error");
        err.status = 500;
        next(err);
    }
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


// console.log("You are about to go into the method") //test
// const completedTransfer = transferFromEnvelope(foundSrcEnvelope, foundDestEnvelope, req.body.amount);
// console.log(JSON.stringify("Completed Transfer: " + completedTransfer)); //test
// res.status(200).send(JSON.stringify(completedTransfer));