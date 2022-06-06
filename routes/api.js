// Importing necessary node modules
const express = require('express');


// Initializing router constiable
const router = express.Router();


// Importing all other routers
const usersRouter = require('./users');
const commentsRouter = require('./comments');
const postsRouter = require('./posts');


// Setting up all the routers 
router.use('/users', usersRouter);
router.use('/posts', postsRouter);
router.use('/comments', commentsRouter);


module.exports = router;
