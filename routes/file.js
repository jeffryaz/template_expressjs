const router = require('express').Router();
const express = require('express');
const path = require('path');
const { isAuthenticated } = require('../config/config.Jwt');

// split up route handling
router.use('/img', isAuthenticated, express.static(path.join(__dirname, '../public')));
// router.use('/categories', require('./categories'));
// etc.

module.exports = router;