// load the environment variables
require("dotenv").config();

// import mongoose and express
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

// setup express app
const app = express();

// set up middleware to handle JSON requests
app.use(express.json());

// set up cors policy (for security)
app.use(cors());

// connect to MongoDB using Mongoose
async function connectToMongoDB() {
  try {
    // wait for the MongoDB to connect
    await mongoose.connect("mongodb://localhost:27017/hospital");
    console.log("MongoDB is connected");
  } catch (error) {
    console.log(error);
  }
}

// trigger the connection with MongoDB
connectToMongoDB();

// setup root route
app.get("/", (req, res) => {
  res.send("Hello world");
});

// setup the /users route
app.use("/users", require("./routes/user"));

// start the express port
app.listen(5120, () => {
  console.log("The server is running at http://localhost:5120");
});
