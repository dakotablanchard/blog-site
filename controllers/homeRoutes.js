const router = require('express').Router();
const { User, Post, Comment } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', async (req, res) => {
    res.redirect('/home');
});

router.get('/login', (req, res) => {
  if (req.session.logged_in) {
    res.redirect('/home');
    return;
  }

  res.render('login');
});

router.get('/home', async (req, res) => {
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

router.get('/dashboard', withAuth,  async (req, res) => {

  const userPostData = await Post.findAll({
    where: {
      user_id: req.session.user_id,
    },
  });

  const userPosts = userPostData.map(post => post.get({ plain: true }));

  res.render('dashboard', {
    userPosts,
    logged_in: req.session.logged_in
  })
})

router.get('/view-post/:id', withAuth, async (req, res) => {
  try {
    const postData = await Post.findByPk(req.params.id, {
      include: [
        {
          model: User,
          attributes: ['id','name'],
        },
        {
          model: Comment,
          attributes: ['comment', 'date_created', 'post_id', 'user_id'],
          include: [
            {
              model: User,
              attributes: ['name'],
            }
          ]
        }
      ],
    });
    
    const post = postData.get({ plain: true });
    console.log(post)
    
    res.render('posts', {
      post,
      logged_in: req.session.logged_in
    });
  } catch (err) {
    res.status(500).json(err);
  }
});


module.exports = router;