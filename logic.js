// Creating Envelope class, to enable me interact with envelopes
class Envelope {
    constructor(name, balance) {
        if (typeof name === "string" && (typeof balance === "number" || !balance)) {
            this.name = name.toLowerCase();
            this.balance = balance || 0;
        } else {
            const err = new Error("Name must be a string; Opening balance must be a number or left blank for 0 balance"); 
            err.status = 400;
            throw err   // to catch in api routes
        }
    }

    info() { // the way I intend to access the envelope information, as opposed to just printing out the entire object
        return {
            name: this.name,
            balance: this.balance
        }
    }

    getBalance() { // in case I just want the balance of the envelope.
        return this.balance;
    }

    spend(amount) {  
        if (typeof amount === "number") {
            this.balance -= amount;
            return this.balance;
        }
        const err = new Error("Amount spent must be a number");  
        err.status = 400;
        throw err   // to catch in api routes
    }

    add(amount) {
        if (typeof amount === "number") {
            this.balance += amount;
            return this.balance;
        }
        const err = new Error("Amount added must be a number");
        err.status = 400;
        throw err   // to catch in api routes
    }
    
};

// Creating initial, dummy envelopes
const bills = new Envelope("bills", 150);
const food = new Envelope("food", 150);
const tithe = new Envelope("tithe");

var envelopes = [bills, food, tithe]; //create new envelopes array


// NOTE: ALWAYS return envelope.info - you never just want to return Envelope object, but the information about it as an object


//create new Envelope function 
const createNewEnvelope = (name, balance) => {
    const newEnvelope = new Envelope(name, balance);
    envelopes.push(newEnvelope.info()); //test that this returns accurately in return array func
    return newEnvelope.info(); //you never just want to return Envelope object, but the information about it as an object
};

// get envelope from array by name 
const getEnvelopeByName = (name) => {
    const foundEnvelope = envelopes.find((envelope) => envelope.name === name);
    if (foundEnvelope) {
        return foundEnvelope.info();
    }
    const err = new Error("Envelope name doesn't exist");
    err.status = 400;
    throw err; //make sure this is caught 
}

// Return array of envelopes
const getAllEnvelopes = () => {
    // console.log(envelopes); test
    return JSON.stringify(envelopes); 
}


// Spend from an envelope
const spendFromEnvelope = (envelope, amount) => {
    envelope.spend(amount);
    return envelope.info();
}




// Add to an envelope






// Transfer from one envelope to another





// Delete an envelope
    //should use the splice function here, I believe 





module.exports = {
    Envelope,
    createNewEnvelope,
    getEnvelopeByName,
    getAllEnvelopes,
}