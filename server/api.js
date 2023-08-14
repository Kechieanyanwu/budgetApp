const express = require("express");
const apiRouter = express();
const {Envelope,
    createNewEnvelope,
    getEnvelopeByName,
    getAllEnvelopes,
    spendFromEnvelope,
    addToEnvelope,
    transferFromEnvelope,
    deleteEnvelope,} = require("../logic");


// Middleware for validating new Envelope details
const validateNewEnvelopeDetails = (req, res, next) => {
    if (req.body.name) { // If the envelope name value exists. Name MUST be present, amount doesn't have to be as we can start an envelope with 0 balance
        req.name = String(req.body.name).toLowerCase(); 
        req.balance = req.body.balance || undefined;
        next();
    } else {
    const err = new Error("New Envelope must have a name.");
    err.status = 400;
    next(err);
    }
};

// Middleware for validating an Envelope name exists
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
        req.envelope = foundEnvelope.info();
        next();
    } else {
        const err = new Error("Please include an Envelope name.");
        err.status = 400;
        next(err);
        }
})

// Middleware for validating Envelope details
const validateUpdatedEnvelopeDetails = (req, res, next) => {
    if (req.body.name && req.body.amount) { // Checks if there is an envelope name and amount to change by
        let foundEnvelope;
        if (typeof req.body.name === "string" && typeof req.body.amount === "number") { // Type validation
            if (req.body.amount > 0) { // Checks that the amount is greater than 0 
                try {
                    foundEnvelope = getEnvelopeByName(String(req.body.name).toLowerCase()); 
                } catch (err) {
                    next(err);
                    return;
                }
                req.envelope = foundEnvelope;
                req.amount = req.body.amount;
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
};
 

// Create an Envelope
apiRouter.post("/create", validateNewEnvelopeDetails, (req, res, next) => {
    const newEnvelope = createNewEnvelope(req.name, req.balance);
    res.status(201).send(newEnvelope);
});

// Return all Envelopes 
apiRouter.get("/", (req, res, next) => {
    res.status(200).send(JSON.stringify(getAllEnvelopes())); 
});

// Return specific Envelope 
apiRouter.get("/:envelope", (req, res, next) => {
    res.status(200).send(req.envelope);
});

// Spend from a specific Envelope
apiRouter.put("/spend", validateUpdatedEnvelopeDetails, (req, res, next) => {
    const updatedEnvelope = spendFromEnvelope(req.envelope, req.amount);
    res.status(200).send(updatedEnvelope);
});

// Add to a specific Envelope
apiRouter.put("/add", validateUpdatedEnvelopeDetails, (req, res, next) => {
    const updatedEnvelope = addToEnvelope(req.envelope, req.amount);
    res.status(200).send(updatedEnvelope);
});


// Transfer between two Envelopes
apiRouter.put("/transfer", (req, res, next) => { 
    if (req.body.source && req.body.destination && req.body.amount) {
        // including multiple envelope validation inside the route as multiple envelopes are specific to the transfer route
        if (typeof req.body.source === "string" && typeof req.body.destination === "string" && typeof req.body.amount === "number" && req.body.amount > 0) { 
            let foundSrcEnvelope;
            let foundDestEnvelope;
            try {
                foundSrcEnvelope = getEnvelopeByName(String(req.body.source).toLowerCase());
                foundDestEnvelope = getEnvelopeByName(String(req.body.destination).toLowerCase());
            } catch(err) {
                next(err);
                return;
            }
            const completedTransfer = transferFromEnvelope(foundSrcEnvelope, foundDestEnvelope, req.body.amount);
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


// Delete a specific Envelope
apiRouter.delete("/delete/:envelope", (req, res, next) => {
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
