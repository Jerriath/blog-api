// Importing necessary node modules
const express = require('express');


// Importing controller module
const controller = require('../controllers/commentsController');


// Initializing router variable
const router = express.Router();


// Setting up all the routes for this secific router
// GET for all comments on a post
router.get('/:postId', controller.all_comments);

// POST for a creating a single comment on a post
router.post('/:postId', controller.post_comment);

// DELETE for a single comment on a post
router.delete('/:commentId', controller.delete_comment);


module.exports = router;