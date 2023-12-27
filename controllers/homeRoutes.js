const router = require('express').Router();
const { User, Post } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', withAuth, async (req, res) => {
  if (req.session.logged_in) {
    res.redirect('/home');
    return;
  }

});

router.get('/login', (req, res) => {
  if (req.session.logged_in) {
    res.redirect('/home');
    return;
  }

  res.render('login');
});

router.get('/home', withAuth, async (req, res) => {
  try {
    // Get all projects and JOIN with user data
    const postData = await Post.findAll({
      include: [
        {
          model: User,
          attributes: ['name'],
        },
      ],
    });

    const posts = postData.map((post) => post.get({ plain: true }));

    res.render('homepage', {
      posts,
      logged_in: req.session.logged_in
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;