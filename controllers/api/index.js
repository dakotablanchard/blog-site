// Import the Express router, userRoutes.js, and postRoutes.js
const router = require('express').Router();
const userRoutes = require('./userRoutes');
const postRoutes = require('./postRoutes');

// Set api routes for users and posts
router.use('/users', userRoutes);
router.use('/blog-posts', postRoutes);

// Export the router
module.exports = router;