// Importing model
const Users = require('../models/user');

// Importing necessary node modules
const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const { body, validationResult } = require('express-validator');

// Exporting controller middleware
exports.user_create_post = [
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
        (req, res, next) => {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                res.json({
                    username: username,
                    errors
                });
            }
            
        }
]