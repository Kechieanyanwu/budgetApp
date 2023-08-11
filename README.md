# budgetApp

WIP Envelope Budgeting application.

<!-- THIS README IS A WIP AS I WORK THROUGH THE APPLICATION. -->

How to run:
1. Clone this repository to your folder
2. Run "npm install" in your terminal to install dependecies
3. Run "npm run start" to launch server. This server will restart any time you save, as it is using "nodemon"
    - You can also run "node server.js" if you don't want automatic restarts 
4. Open up Postman, and navigate to the required API endpoint
5. While there are 3 dummy envelopes to start, you could create additional Envelopes, or budgets 
    - Send a POST request to "/api/create" with the envelope details in the request body in JSON encoding raw format
        - Each Envelope must have a name, with the balance optional. If the balance is left out, it will default to 0 
6. Try getting all your envelopes
    - Send a GET request to "/api/", with no body. You should receive an array of Envelope objects 
7. Note that server restarts reset your envelopes to the 3 default envelopes


<!-- My current process: 
1. Checking my application requirements
2. Building out the required API endpoints in the api.js file
3. Building the logic in the logic.js file
4. Iterating between 2 and 3  -->


Project Objectives:

- Build an API using Node.js and Express
- Be able to create, read, update, and delete envelopes
- Create endpoint(s) to update envelope balances
- Use Git version control to keep track of your work
- Use the command line to navigate your files and folders
- Use Postman to test API endpoints

