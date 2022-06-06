// Importing necessary node modules
const express = require('express');

// Initializing router variable
const router = express.Router();

// Importing controller module
const controller = require('../controllers/postsController');

// GET for all posts
router.get('/', controller.posts_list);

// GET for a single post
router.get('/:postId', controller.posts_get);

// POST for a new post
router.post('/create', controller.posts_malone);

// UPDATE for a post
router.put('/:postId', controller.posts_update);

// DELETE for a post
router.delete('/:postId', controller.posts_delete);

module.exports = router;