// Importing model
const Users = require('../models/user');


// Importing necessary node modules
const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const { body, validationResult } = require('express-validator');


// Exporting controller middleware
exports.signup = [
    body('username')
        .trim()
        .isLength({ min: 1})
        .escape(),
    body('password')
        .trim()
        .isLength({ min: 1 })
        .escape(),
    body('confirmation')
        .trim()
        .isLength({ min: 1 })
        .escape()
        .custom((confirmation, { req }) => {
            if (confirmation !== req.body.password) { return next(new Error("Password did not match confirmation"))}
            else { return true; }
        }),
    async (req, res, next) => {

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            res.json({
                username: username,
                errors
            });
        }
        
        passport.authenticate('signup', { session: false }, (err, user) => {
            if (err) { return next(err); }
            res.json({
                message: "Signed up successfully",
                user
            });
        })(req, res, next);
    }
]

exports.login = [
    body('username')
        .trim()
        .isLength({ min: 1})
        .escape(),
    body('password')
        .trim()
        .isLength({ min: 1 })
        .escape(),
    (req, res, next) => {

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            res.json({
                username,
                errors
            });
        }

        passport.authenticate('login', { session: false }, (err, user, info) => {
            try {
                if (err) { throw err; }
                if (!user) { throw new Error('No user object returned'); }
                req.login(user, { session: false }, async (err) => {
                    if (err) { throw err; }
                    const token = jwt.sign({ user }, process.env.JWT_SECRET, { expiresIn: '2h' });
                    return res.json({ token });
                });
            }

            catch(err) {
                next(err);
            }
        })(req, res, next);
    }
]

exports.logout = (req, res) => {
    req.logout();
    res.redirect('/');
}