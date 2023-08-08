const express = require("express");
const app = express();
const PORT = process.env.PORT || 4001;
const cors = require("cors");
const morgan = require("morgan");

app.use(cors()) //enable all CORS requests. Do I need this? 
app.use(morgan("tiny")); // HTTP request logger. Useful for debugging and testing 

app.get("/", (req, res, next) => {

})


app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`)
  })

