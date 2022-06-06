// Importing necessary node modules
const express = require('express');

// Importing controller module
const controller = require('../controllers/usersController');

// Initializing router variable
const router = express.Router();

// POST for signing in
router.post('/', controller.users_post);

// POST for creating a user (NOTE: will eventually be commented out in future update)
router.post('/create', controller.users_create_post);

module.exports = router;