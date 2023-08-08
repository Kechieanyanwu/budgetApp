# budgetApp
WIP Envelope Budgeting application.


How to run:
1. Clone this repository to your folder
2. Run "npm install" in your terminal to install dependecies
3. Run "npm run start" to launch server. This server will relaunch any time you save, as it is using "nodemon"

Update:
- Decided to switch from having envelope-based API endpoints, to having action-based API endpoints
    - Logic behind this is that the actions per envelope are the same, so this would help avoid code smell 
    - Should also allow for creation of envelopes by using an action endpoint to create and return a new envelope

My current process: 
1. Checking my application requirements
2. Building out the required API endpoints in the api.js file
3. Building the logic in the logic.js file
4. Iterating between 2 and 3 


Project Objectives:

Build an API using Node.js and Express
Be able to create, read, update, and delete envelopes
Create endpoint(s) to update envelope balances
Use Git version control to keep track of your work
Use the command line to navigate your files and folders
Use Postman to test API endpoints

