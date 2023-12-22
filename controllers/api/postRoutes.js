const router = require('express').Router();

router.get('/', (req, res) => {
    res.send('blog-post route');
  });
  
  module.exports = router;