// Importing all necessary node modules
const express = require('express');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

// Importing the api router
const apiRouter = require('./routes/api');

// Importing models
const User = require('./models/user');

// Setting up passport middleware
passport.use('signup', new LocalStrategy(
    {
        'usernameField': 'username',
        'passwordField': 'password'
    },
    (username, password, done) => {
        const newUser = new User({
            username,
            password
        });
        newUser.save((err) => {
            return next(err);
        });
        return done(null, newUser);
    }
))

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
