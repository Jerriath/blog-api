// Importing models
const comments = require('../routes/comments');
const posts = require('../routes/posts');


// Importing necessary node modules
const express = require('express');
const mongoose = require('mongoose');
const { body, validationResult } = require('express-validator');


// Exporting controller middleware
exports.all_comments = (req, res, next) => {
    res.json({
        message: 'Not implemented yet'
    });
}

exports.post_comment = [
    body('name')
        .trim(),
    body('message')
        .trim(),
    body('date'),
    (req, res, next) => {
        res.json({
            message: 'Not implemented yet'
        });
    }
]

exports.delete_comment = (req, res, next) => {
    res.json({
        message: 'Not implemented yet'
    });
}