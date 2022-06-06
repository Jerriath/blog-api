// Importing models
const comments = require('../routes/comments');
const posts = require('../routes/posts');
const users = require('../routes/users');

// Importing necessary node modules
const express = require('express');
const mongoose = require('mongoose');
const { body, validationResult } = require('express-validator');

// Exporting controller middleware
exports.posts_list = (req, res, next) => {
    res.json({
        message: 'Not implemented yet'
    });
}
exports.posts_get = (req, res, next) => {
    res.json({
        message: 'Not implemented yet'
    });
}
exports.posts_malone = (req, res, next) => {
    res.json({
        message: 'Not implemented yet'
    });
}
exports.posts_update = (req, res, next) => {
    res.json({
        message: 'Not implemented yet'
    });
}
exports.posts_delete = (req, res, next) => {
    res.json({
        message: 'Not implemented yet'
    });
}