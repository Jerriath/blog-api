// Importing model
const users = require('../models/user');

// Importing necessary node modules
const express = require('express');
const mongoose = require('mongoose');
const { body, validationResult } = require('express-validator');