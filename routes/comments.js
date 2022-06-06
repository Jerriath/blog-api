// Importing necessary node modules
const express = require('express');

// Importing controller module
const controller = require('../controllers/commentsController');

// Initializing router variable
const router = express.Router();

// GET for all comments on a post
router.get('/comments/:postId', controller.comments_list);

// POST for a creating a single comment on a post
router.post('/comments/create', controller.comments_post);

// DELETE for a single comment on a post
router.delete('/comments/:commentId/delete', controller.comments_delete);

module.exports = router;