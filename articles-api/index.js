const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
require('dotenv').config();
const articleRoutes = require('./routes/article');

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', '*');
  res.setHeader('Access-Control-Allow-Headers', '*');
  next();
});

app.use('/articles',articleRoutes);

mongoose
  .connect(
    `mongodb+srv://${process.env.MONGO_ATLAS_NAME}:${process.env.MONGO_ATLAS_PW}@${process.env.MONGO_ATLAS_CLUSTER}/${process.env.MONGO_DB_NAME}?retryWrites=true&w=majority`,
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => {
    console.log("Successfully Connected to Database");
    app.listen(4000);
  })
  .catch((err) => {
    console.log("Failed to Connect to Database");
    console.log(err);
  });