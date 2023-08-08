const express = require("express");
const app = express();
const PORT = process.env.PORT || 4001;
const cors = require("cors");
const morgan = require("morgan");
const apiRouter = require("./server/api");

app.use(cors()) //enable all CORS requests. Do I need this? 
app.use(morgan("tiny")); // HTTP request logger. Useful for debugging and testing 

// Mount all apiRouter at this path. All API requests to go to api.js
app.use("/api", apiRouter);


app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`)
  })

