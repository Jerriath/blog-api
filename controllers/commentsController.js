// Importing models
const Comment = require('../models/comment');


// Importing necessary node modules
const express = require('express');
const mongoose = require('mongoose');
const { body, validationResult } = require('express-validator');
const { json } = require('express/lib/response');


// Exporting controller middleware
exports.all_comments = async (req, res, next) => {
    // Essentially need to call find on Comment and look for comments with a comment value of req.params.commentId
    try {
        const comments = await Comment.find({ "post": req.params.postId }).sort([['date', -1]]);
        if (!comments) { return res.status(404).json({ message: `could not find comments with a commentId of ${req.params.commentId}`})}
        return res.status(200).json({ comments });
    }

    catch(err) {
        next(err);
    }
}

exports.post_comment = [
    body('name')
        .trim()
        .isLength({ min: 1 })
        .escape(),
    body('message')
        .trim()
        .isLength({ min: 1 })
        .escape(),

    async (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) { return res.json({
            name: req.body.name,
            message: req.body.message,
            errors
        })};

        try {
            const newComment = await new Comment({
                name: req.body.name,
                message: req.body.message,
                post: req.params.postId,
                date: Date.now()
            });
            await newComment.save((err, comment) => {
                if (err) { throw err }
                res.status(200).json({ comment });
            })
        }

        catch (err) {
            return next(err);
        }
    }
]

exports.delete_comment = async (req, res, next) => {
    try {
        const comment = await Comment.findByIdAndDelete(req.params.commentId);
        if (!comment) { return res.status(404).json({ message: `could not find comment with an id of ${req.params.commentId}`}); }
        return res.status(200).json({ comment });
    }

    catch (err) {
        next(err);
    }
}