// Importing all necessary node modules
const express = require('express');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const mongoose = require('mongoose');
const cors = require('cors');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
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

// Setting up passport middleware
passport.use('signup', new LocalStrategy(
    {
        'usernameField': 'username',
        'passwordField': 'password' 
    },
    async (username, password, done) => {
        const newUser = await new User({
            username,
            password
        });
        console.log("Console.log from app.js: " + newUser);
        await newUser.save(function(err) {
            if (err) { return done(err); }
        });
        done(null, newUser);
    }
));

// Initializing our app variable
const app = express();

// Setting up some middleware
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors());

// Setting up the routing middleware
app.use('/api', apiRouter);

module.exports = app;
