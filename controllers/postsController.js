// Importing models
const comments = require('../routes/comments');
const posts = require('../routes/posts');
const users = require('../routes/users');

// Importing necessary node modules
const express = require('express');
const mongoose = require('mongoose');
const { body, validationResult } = require('express-validator');

// Exporting controller functions