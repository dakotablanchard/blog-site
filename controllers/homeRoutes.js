// Import modules
const router = require('express').Router();
const { User, Post, Comment } = require('../models');
const withAuth = require('../utils/auth');

// Setting the default route to /home
router.get('/', async (req, res) => {
    res.redirect('/home');
});

// Route for the LOGIN screen
router.get('/login', (req, res) => {
  // If user is logged in redirect them to home
  if (req.session.logged_in) {
    res.redirect('/home');
    return;
  }
  // Render the login.handlebars template and the login.css stylesheet
  res.render('login', {
    style: 'login.css'
  });
});

// Route for the HOME screen 
router.get('/home', async (req, res) => {
  try {
    // Get all posts with additional User data
    const postData = await Post.findAll({
      include: [
        {
          model: User,
          attributes: ['name'],
        },
      ],
    });

    // Turning Sequalize data into plain JavaScript objects
    const posts = postData.map((post) => post.get({ plain: true }));

    // Render the homepage.handlebars template and the home.css stylesheet
    res.render('homepage', {
      style: 'home.css',
      posts,
      logged_in: req.session.logged_in
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Route for the DASHBOARD screen
router.get('/dashboard', withAuth,  async (req, res) => {

  // Get all posts that the current user has made
  const userPostData = await Post.findAll({
    where: {
      user_id: req.session.user_id,
    },
  });

  // Turning Sequalize data into plain JavaScript objects
  const userPosts = userPostData.map(post => post.get({ plain: true }));

  // Render the dashboard.handlebars template and the dashboard.css stylesheet
  res.render('dashboard', {
    style: 'dashboard.css',
    userPosts,
    logged_in: req.session.logged_in
  })
});

// Route for specfic posts
router.get('/view-post/:id', withAuth, async (req, res) => {
  try {
    // Get specific post based off of the post id in the URL parameter
    const postData = await Post.findByPk(req.params.id, {
      // Retrieve USER and COMMENT data associated with post
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
    
    // Turning Sequalize data into plain JavaScript objects
    const post = postData.get({ plain: true });
    
    // Render the posts.handlebars template and the posts.css stylesheet
    res.render('posts', {
      style: 'posts.css',
      post,
      logged_in: req.session.logged_in
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Export the router
module.exports = router;