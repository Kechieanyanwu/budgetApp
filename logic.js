// for application logic 

// Creating Envelope class, to enable me interact with envelopes
class Envelope {
    constructor(name, balance) {
        if (typeof name === "string" && (typeof balance === "number" || !balance)) {
            this.name = name;
            this.balance = balance || 0;
        } else {
            const err = new Error("Name must be a string; Opening balance must be a number or left blank for 0 balance"); 
            err.status = 400;
            throw err   // to catch in api routes
        }
    }

    info() { // the way I intend to access the envelope information, as opposed to just printing out
        return {
            name: this.name,
            balance: this.balance
        }
    }

    getBalance() { // in case I just want the balance of the envelope
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

var envelopes = []; //create new envelopes array


//create new Envelope 






// Testing the class
// const bills = new Envelope("bills", 150);


// console.log(bills.info());
// bills.add(130);
// console.log(bills.info());

// bills.spend(100);
// console.log(bills.info());
// console.log(bills.getBalance());

module.exports = {
    Envelope,
}