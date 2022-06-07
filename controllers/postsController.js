// Importing models
const Comment = require('../models/comment');
const Post = require('../models/post');
const User = require('../models/user');


// Importing necessary node modules
const express = require('express');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const { body, validationResult } = require('express-validator');
const { json } = require('express/lib/response');


// Exporting controller middleware
exports.all_posts = async (req, res, next) => { // Eventually I want to only query the key-value pairs that I need for this middleware
    try {
        const posts = await Post.find({}).populate({ path: 'user', model: 'User'});
        console.log(posts);
        if (!posts) {
            throw new Error('nSomething definitely went wrong');
        }
        return res.status(200).json({ posts });
    }
    
    catch (err) {
        next(err);
    }
}

exports.get_post = async (req, res, next) => {
    try {
        const post = await Post.findById(req.params.postId).populate({ path: 'user', model: 'User'});
        console.log(post);
        if (!post) { return res.status(404).json({ message: `could not find post with an id of ${req.params.postId}`})}
        return res.status(200).json({ post });
    }

    catch (err) {
        next(err);
    }
}
// fun name cuz otherwise, following the naming pattern I'm enforcing, it woulda been called post_post which is dumb and stupid and dumb
exports.post_malone = [ // OOOOooOOooooo some things you just can't refuuuuse, she wanna ride me like a cruuuuuise, and I'm nooooot tryna looooooose
    body('title')
        .trim()
        .isLength({ min: 1 })
        .escape(),
    body('content')
        .trim()
        .isLength({ min: 1 })
        .escape(),
    
    async (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.json({
                title: req.body.title,
                content: req.body.content,
                errors
            })
        }

        const newPost = await new Post({
            title: req.body.title,
            content: req.body.content,
            date: Date.now(),
            user: req.user._id,
            published: req.body.published
        });

        try {
            await newPost.save((err, newPost) => {
                if (err) { throw err; }
                return res.status(200).json({ newPost });
            })
        }

        catch {
            next(err);
        }
    }
]
    

exports.update_post = [
    body('title')
        .trim()
        .isLength({ min: 1 })
        .escape(),
    body('content')
        .trim()
        .isLength({ min: 1 })
        .escape(),
    
    async (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.json({
                title: req.body.title,
                content: req.body.content,
                errors
            })
        }

        try {
            const post = await Post.findByIdAndUpdate(req.params.postId, {
                title: req.body.title,
                content: req.body.content,
                date: Date.now()
            })
            if (!post) { return res.status(404).json({ message: `couldnot find post with an id of ${req.params.postId}`}) }
            return res.status(200).json({ post })
        }

        catch(err) {
            next(err);
        }
    }
]

exports.delete_post = async (req, res, next) => {
    try {
        //Need to delete all comments referencing post first


        const post = await Post.findByIdAndDelete(req.params.postId);
        if (!post) { return res.status(404).json({ message: `could not find post with an id of ${req.params.postId}`}); }
        return res.status(200).json({ post });
    }

    catch (err) {
        next(err);
    }
}