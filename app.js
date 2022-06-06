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
const JwtStrategy = require('passport-jwt/lib/strategy');
const { ExtractJwt } = require('passport-jwt/lib');


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
        try {
            const newUser = await new User({
                username,
                password
            });
            await newUser.save(function(err) {
                if (err) { throw err; }
            });
            return done(null, newUser);
        } 
        
        catch(err) {
            done(err);
        }
    }
));

passport.use('login', new LocalStrategy(
    {
        'usernameField': 'username',
        'passwordField': 'password'
    },
    
    async (username, password, done) => {
        try {
            const user = await User.findOne({username});
            if (!user) {
                throw new Error("User was not found");
            }
            const validationStatus = await user.validatePassword(password);
            if (!validationStatus) {
                throw new Error('Password was incorrect');
            }
            return done(null, user, { 'message': 'Logged in successfully'})
        } 
        
        catch(err) {
            done(err);
        }
    }
));

passport.use(new JwtStrategy(
    {
        'secretOrKey': process.env.JWT_SECRET,
        'jwtFromRequest': ExtractJwt.fromAuthHeaderAsBearerToken()
    },
    
    async (token, done) => {
        return done(null, token.user);
    }
));


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
