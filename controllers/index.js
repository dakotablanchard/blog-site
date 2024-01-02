// Import the Express router
const router = require('express').Router();

// Import the api and home routes
const apiRoutes = require('./api');
const homeRoutes = require('./homeRoutes');

// Creating the route for homeRoutes.js and the api folder
router.use('/', homeRoutes);
router.use('/api', apiRoutes);

// Export the router
module.exports = router;