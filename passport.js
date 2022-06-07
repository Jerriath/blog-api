// Importing necessary node modules
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const JwtStrategy = require('passport-jwt/lib/strategy');
const { ExtractJwt } = require('passport-jwt/lib');


// Importing models
const User = require('./models/user');


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


module.exports = passport;