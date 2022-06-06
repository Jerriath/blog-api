// Importing models
const comments = require('../routes/comments');
const posts = require('../routes/posts');
const users = require('../routes/users');


// Importing necessary node modules
const express = require('express');
const mongoose = require('mongoose');
const { body, validationResult } = require('express-validator');


// Exporting controller middleware
exports.all_posts = (req, res, next) => {
    res.json({
        message: 'Not implemented yet'
    });
}

exports.get_post = (req, res, next) => {
    res.json({
        message: 'Not implemented yet'
    });
}

exports.post_malone = (req, res, next) => {
    res.json({
        message: 'Not implemented yet'
    });
}

exports.update_post = (req, res, next) => {
    res.json({
        message: 'Not implemented yet'
    });
}

exports.delete_post = (req, res, next) => {
    res.json({
        message: 'Not implemented yet'
    });
}