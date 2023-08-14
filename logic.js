// Creating Envelope class, to enable me interact with envelopes
class Envelope {
    constructor(name, balance) {
      if (typeof name === "string" && (typeof balance === "number" || !balance)) {
        this.name = name.toLowerCase();
        this.balance = balance || 0;
      } else {
        const err = new Error("Name must be a string; Opening balance must be a number or left blank for 0 balance");
        err.status = 400;
        throw err;
      }
    }
  
    info() { // The way I intend to access the envelope information, as opposed to just printing out the entire object
      return {
        name: this.name,
        balance: this.balance,
      };
    }
  
    getBalance() { // In case I just want the balance of the envelope
      return this.balance;
    }
  
    spend(amount) {
      if (this.getBalance() === 0) { 
        const err = new Error(`${this.name}'s current balance is empty.`);
        err.status = 400;
        throw err;
        }
      if (typeof amount === "number" && amount <= this.getBalance()) {
        this.balance -= amount;
        return this.info();
      }
      const err = new Error(`Amount spent must be a number not greater than ${this.name} current balance of ${this.balance}`);
      err.status = 400;
      throw err;
    }
  
    add(amount) {
      if (typeof amount === "number" && amount > 0) {
        this.balance += amount;
        return this.info();
      }
      const err = new Error("Amount added must be a number greater than 0.");
      err.status = 400;
      throw err;
    }
  }


// Creating initial, dummy envelopes
const bills = new Envelope("bills", 150);
const food = new Envelope("food", 150);
const tithe = new Envelope("tithe");

// Create new envelopes array
var envelopes = [bills, food, tithe]; 


// Create new Envelope function 
const createNewEnvelope = (name, balance) => {
    const duplicateName = envelopes.find(envelope => envelope.name === name); //checks for whether envelope name alreadt exists
    if (duplicateName) {
        const err = new Error("You can't have two envelopes with the same name.");
        err.status = 400;
        throw err;
        return;
    } else {
        const newEnvelope = new Envelope(name, balance);
        envelopes.push(newEnvelope);
        return newEnvelope.info(); // Returns a formatted representation of the envelope
    }
};


// Get envelope from array by name 
const getEnvelopeByName = (name) => {
    const foundEnvelope = envelopes.find((envelope) => envelope.name === name);
    if (foundEnvelope) {
        return foundEnvelope;
    }
    const err = new Error("Envelope name doesn't exist");
    err.status = 400;
    throw err;
};


// Return array of envelopes
const getAllEnvelopes = () => {
    return envelopes; 
};


// Spend from an envelope
const spendFromEnvelope = (envelope, amount) => {
    return envelope.spend(amount); 
};


// Add to an envelope
const addToEnvelope = (envelope, amount) => {
    return envelope.add(amount);
};


// Transfer from one envelope to another
const transferFromEnvelope = (srcEnvelope, destEnvelope, amount) => {
    const prevSrcEnvelope = {...srcEnvelope}; 
    const prevDestEnvelope = {...destEnvelope};
    const updatedSrcEnvelope = spendFromEnvelope(srcEnvelope, amount);
    const updatedDestEnvelope = addToEnvelope(destEnvelope, amount);
    const response = {
        AmountTransferred: amount,
        PreviousSource: prevSrcEnvelope,
        UpdatedSource: updatedSrcEnvelope,
        PreviousDest: prevDestEnvelope,
        UpdatedDest: updatedDestEnvelope
    }
    return response;
};


// Delete an envelope
const deleteEnvelope = (envelope) => {
    const deleteIndex = envelopes.findIndex(env => env.name === envelope.name);
    if (deleteIndex === -1) {
        const err = new Error("Envelope does not exist");
        err.status = 400; 
        throw(err); 
    }
    const deleted = envelopes.splice((deleteIndex), 1);
    return deleted; 
};


module.exports = {
    Envelope,
    createNewEnvelope,
    getEnvelopeByName,
    getAllEnvelopes,
    spendFromEnvelope,
    addToEnvelope,
    transferFromEnvelope,
    deleteEnvelope,
};