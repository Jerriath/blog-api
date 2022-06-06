// Importing all necessary node modules
const express = require('express');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

// Importing the api router
const apiRouter = require('./routes/api');

// Initializing our app variable
const app = express();

// Setting up some middleware
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// Setting up the routing middleware
app.use('/api', apiRouter);

module.exports = app;
