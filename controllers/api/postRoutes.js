const router = require('express').Router();
const { Post, Comment } = require('../../models');
const withAuth = require('../../utils/auth');

router.post('/create-post', async (req, res) => {
  try {
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

router.put('/update-post/:id', async (req, res) => {
  console.log(req.body)
    try {
    // Find the post by ID
    const post = await Post.findByPk(req.params.id);

    if (!post) {
      // If the post is not found, return a 404 status
      return res.status(404).json({ message: 'Post not found' });
    }

    // Update the post's properties
    post.title = req.body.newTitle;
    post.content = req.body.newContent;

    // Save the updated post
    await post.save();

    // Respond with the updated post
    res.status(200).json(post);
  } catch (err) {
    res.status(400).json(err);
  }
})

router.post('/create-comment', async (req, res) => {
  console.log(req.body.comment)
  try {
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


  module.exports = router;