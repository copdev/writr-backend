const path = require("path");
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

require('dotenv').config();

// Initialize Server
const app = express();

app.use(cors());


// Create PORT
const port = process.env.PORT || 5000;

// Apply CORS
app.use(cors());

// Apply Body Parser
app.use(express.json());

// Connect to DataBase
const uri = process.env.ATLAS_URI; 

mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const connection = mongoose.connection;
connection.once("open", () => {
  console.log("MongoDB connection established successfully!");
});

const articlesRouter = require('./routes/articles');

app.use("/articles", articlesRouter);

// Start Server 

app.listen(port, () => {
    console.log(`Server is running on Port: ${port}`);
});