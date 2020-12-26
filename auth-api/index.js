const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
require('dotenv').config();

const authRoutes = require("./routes/auth");

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', '*');
  res.setHeader('Access-Control-Allow-Headers', '*');
  next();
});

app.use('/auth',authRoutes);

mongoose
  .connect(
    `mongodb+srv://${process.env.MONGO_ATLAS_NAME}:${process.env.MONGO_ATLAS_PW}@${process.env.MONGO_ATLAS_CLUSTER}/${process.env.MONGO_DB_NAME}?retryWrites=true&w=majority`,
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => {
    console.log("Successfully Connected to Database");
    app.listen(3000);
  })
  .catch((err) => {
    console.log("Failed to Connect to Database");
    console.log(err);
  });
