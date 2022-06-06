// Importing necessary node modules
const express = require('express');

// Initializing router variable
const router = express.Router();

// Importing controller module
const controller = require('../controllers/postsController');

// GET for all posts
router.get('/posts', controller.posts_list);

// GET for a single post
router.get('/posts/:postId', controller.posts_get);

// POST for a new post
router.post('/posts/create', controller.posts_malone);

// UPDATE for a post
router.update('/posts/:postId', controller.posts_update);

// DELETE for a post
router.delete('/posts/:postId', controller.posts_delete);

module.exports = router;