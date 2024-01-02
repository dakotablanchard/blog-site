// Import modules
const router = require('express').Router();
const { Post, Comment } = require('../../models');
const withAuth = require('../../utils/auth');

// POST route for creating posts
router.post('/create-post', async (req, res) => {
  try {
    // Using data from the request body to create post in the database
    const newPost = await Post.create({
      title: req.body.title,
      content: req.body.content,
      user_id: req.session.user_id,
    });

    res.status(200).json(newPost);
  } catch (err) {
    res.status(400).json(err);
  }
});

// PUT route for updating/editing a specific post
router.put('/update-post/:id', async (req, res) => {
  try {
    // Find the post by ID in the URL parameter
    const post = await Post.findByPk(req.params.id);

    // If the post is not found, return a 404 status
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    // Update the post data
    post.title = req.body.newTitle;
    post.content = req.body.newContent;

    // Save the updated post
    await post.save();

    res.status(200).json(post);
  } catch (err) {
    res.status(400).json(err);
  }
})

// DELETE route for deleting posts
router.delete('/delete-post/:id', async (req, res) => {
  try {
    // Find the post by ID in the URL parameter
    const post = await Post.findByPk(req.params.id);

    // If the post is not found, return a 404 status
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    // Delete the post
    await post.destroy();

    res.status(200).json({ message: 'Post deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// POST route for adding comments
router.post('/create-comment', async (req, res) => {
  try {
    // Using data from the request body to create a comment in the database
    const newComment = await Comment.create({
      comment: req.body.comment,
      post_id: req.body.postId,
      user_id: req.session.user_id,
    });

    res.status(200).json(newComment);
  } catch (err) {
    res.status(400).json(err);
  }
});

// Export the router
module.exports = router;