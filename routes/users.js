// Importing necessary node modules
const express = require('express');


// Importing controller module
const controller = require('../controllers/usersController');


// Initializing router variable
const router = express.Router();

// Setting up all the routes for this specific router
// POST for signing in
router.post('/', controller.login);

// POST for creating a user (NOTE: will eventually be commented out in future update)
router.post('/create', controller.signup);


module.exports = router;