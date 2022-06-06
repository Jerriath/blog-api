// Importing all necessary node modules
const express = require('express');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();


// Importing the api router
const apiRouter = require('./routes/api');


// Importing models
const User = require('./models/user');


// Setting up mongoose connection to MongoDB
const mongoDB = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@clusterbusterbaxter.fucvx.mongodb.net/blog_db?retryWrites=true&w=majority`;
mongoose.connect(mongoDB, { useNewUrlparser: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.on('error', console.error.bind(console, "MongoDB connection error"));


// Requiring in passport file
require('./passport');


// Initializing our app and setting up its middleware
const app = express();
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors());


// Setting up the routing middleware
app.use('/api', apiRouter);


module.exports = app;
