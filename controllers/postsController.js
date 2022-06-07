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
exports.all_posts = async (req, res, next) => {
    try {
        const posts = await Post.find({}).populate({ path: "user", model: "User"});
        console.log(posts);
        if (!posts) {
            throw new Error('no posts found in db');
        }
        return res.json({ posts });
    }
    
    catch (err) {
        next(err);
    }
}

exports.get_post = async (req, res, next) => {
    try {
        const post = await Post.findById(req.params.id);
        if (!post) {
            throw new Error('no posts found in db');
        }
        return res.json({ post });
    }

    catch (err) {
        next(err);
    }
}

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
                return res.json({ newPost });
            })
        }

        catch {
            next(err);
        }
    }
]
    

exports.update_post = (req, res, next) => {
    return res.json({
        message: 'Not implemented yet'
    });
}

exports.delete_post = (req, res, next) => {
    return res.json({
        message: 'Not implemented yet'
    });
}