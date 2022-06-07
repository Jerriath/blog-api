// Importing necessary node modules
const express = require('express');
const passport = require('passport');


// Initializing router variable
const router = express.Router();


// Importing controller module
const controller = require('../controllers/postsController');


// Setting up all the routes for this specific router
// GET for all posts
router.get('/', controller.all_posts);

// GET for a single post
router.get('/:postId', controller.get_post);

// POST for a new post
router.post('/create', passport.authenticate('jwt', { session: false }), controller.post_malone);

// UPDATE for a post
router.put('/:postId', passport.authenticate('jwt', { session: false }), controller.update_post);

// DELETE for a post
router.delete('/:postId', passport.authenticate('jwt', { session: false }), controller.delete_post);


module.exports = router;