// Importing necessary node modules
const express = require('express');

// Importing controller module

// Initializing router variable
const router = express.Router();

// POST for creating a user (NOTE: will eventually be commented out in future update)
router.post('/users/create')

// POST for signing in
router.post('/users', controller.users_post);

module.exports = router;