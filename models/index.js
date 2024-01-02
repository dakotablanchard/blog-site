// Import User, Post, and Comment models
const User = require('./User');
const Post = require('./Post');
const Comment = require('./Comment');

// Define associations between User, Post, and Comment models

// A user can have many posts
User.hasMany(Post, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE'
});

// A user can have many comments
User.hasMany(Comment, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE'
});

// A post belongs to a user
Post.belongsTo(User, {
  foreignKey: 'user_id'
});

// A post can have many comments
Post.hasMany(Comment, {
  foreignKey: 'post_id'
});

// A comment belongs to a user
Comment.belongsTo(User, {
  foreignKey: 'user_id'
});

// A comment belongs to a post
Comment.belongsTo(Post, {
  foreignKey: 'post_id'
});

// Export User, Post, and Comment models for use in other parts of the application
module.exports = { User, Post, Comment };
