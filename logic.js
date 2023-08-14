// Creating Envelope class, to enable me interact with envelopes
class Envelope {
    constructor(name, balance) {
      if (typeof name === "string" && (typeof balance === "number" || !balance)) {
        this.name = name.toLowerCase();
        this.balance = balance || 0;
      } else {
        const err = new Error(
          "Name must be a string; Opening balance must be a number or left blank for 0 balance"
        );
        err.status = 400;
        throw err;
      }
    }
  
    info() {
      // the way I intend to access the envelope information, as opposed to just printing out the entire object
      return {
        name: this.name,
        balance: this.balance,
      };
    }
  
    getBalance() {
      // in case I just want the balance of the envelope.
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
        console.log("You have reached the add amount class method"); //test
      if (typeof amount === "number" && amount > 0) {
        this.balance += amount;
        return this.info();
      }
      const err = new Error("Amount added must be a number greater than 0.");
      err.status = 400;
      throw err; // to catch in api routes
    }
  }

// Creating initial, dummy envelopes
const bills = new Envelope("bills", 150);
const food = new Envelope("food", 150);
const tithe = new Envelope("tithe");

var envelopes = [bills, food, tithe]; //create new envelopes array


//create new Envelope function 
const createNewEnvelope = (name, balance) => {
    const duplicateName = envelopes.find(envelope => envelope.name === name); //checks for whether envelope name alreadt exists
    if (duplicateName) {
        const err = new Error("You can't have two envelopes with the same name.");
        err.status = 400;
        throw err;
        return;
    } else {
        const newEnvelope = new Envelope(name, balance);
        envelopes.push(newEnvelope); //test that this returns accurately in return array func
        return newEnvelope.info(); // Returns a formatted representation of the envelope
    }
};

//     const foundEnvelope = envelopes.find((envelope) => envelope.name === name); to switch
// get envelope from array by name 
const getEnvelopeByName = (name) => {
    console.log("Beginning of GET ENVELOPE BY NAME FUNCTION"); //test
    console.log(envelopes); //test
    console.log(envelopes[0]); //test
    console.log(typeof envelopes[0]); //test
    const foundEnvelope = envelopes.find((envelope) => {
        console.log(typeof envelope);
        return envelope.name === name});
    console.log(`FOUND ENVELOPE FUNCTION RETURNS AN ${JSON.stringify(foundEnvelope)}`); //test
    if (foundEnvelope) {
        return foundEnvelope;
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
    return envelope.spend(amount); 
}


// Add to an envelope
const addToEnvelope = (envelope, amount) => {
    console.log("You have reached the addToEnvelope function"); //test
    return envelope.add(amount);
}


// Transfer from one envelope to another
const transferFromEnvelope = (srcEnvelope, destEnvelope, amount) => {
    console.log("Welcome to the transfer from envelope function with amount " + amount) //test
    console.log(srcEnvelope); //test Issue is that src Envelope is not an envelope
    console.log(destEnvelope); //test
    console.log(amount); //test
    const prevSrcEnvelope = {...srcEnvelope};
    const prevDestEnvelope = {...destEnvelope};
    console.log(prevSrcEnvelope); //test
    const updatedSrcEnvelope = spendFromEnvelope(srcEnvelope, amount);
    console.log("UpdatedSrc is: " + JSON.stringify(updatedSrcEnvelope)) //test
    const updatedDestEnvelope = addToEnvelope(destEnvelope, amount);
    console.log("UpdatedDest is: " + JSON.stringify(updatedDestEnvelope)) //test
    console.log(srcEnvelope); //test
    console.log(destEnvelope); //test
    const response = {
        AmountTransferred: amount,
        PreviousSource: prevSrcEnvelope,
        UpdatedSource: updatedSrcEnvelope,
        PreviousDest: prevDestEnvelope,
        UpdatedDest: updatedDestEnvelope
    }
    return response; // //check if this is the desired format. Is there a better way to format this? 

}




// Delete an envelope
    //should use the splice function here, I believe 
const deleteEnvelope = (envelope) => {
    const deleteIndex = envelopes.findIndex(env => env.name === envelope.name);
    if (deleteIndex === -1) {
        const err = new Error("Envelope does not exist");
        err.status = 400; 
        throw(err); //to be caught in API routes
    }
    const deleted = envelopes.splice((deleteIndex), 1); //check logic
    return deleted; 
}





module.exports = {
    Envelope,
    createNewEnvelope,
    getEnvelopeByName,
    getAllEnvelopes,
    spendFromEnvelope,
    addToEnvelope,
    transferFromEnvelope,
    deleteEnvelope,
}