// Importing necessary modules from sequelize for defining models and data types
const { Model, DataTypes } = require('sequelize');

// Importing the sequelize connection configuration
const sequelize = require('../config/connection');

// Defining the Post model by extending the sequelize Model class
class Post extends Model {}

// Initializing the Post model with its attributes and data types
Post.init(
  {
    // Unique identifier for each post, automatically incremented
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    // Title of the post
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    // Content of the post
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    // Date and time when the post was created, defaulting to the current timestamp
    date_created: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    // Foreign key referencing the user who created the post
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'user',
        key: 'id',
      },
    },
  },
  {
    // Using the sequelize connection
    sequelize,
    // Disabling timestamps for this model
    timestamps: false,
    // Ensuring the table name in the database matches the model name
    freezeTableName: true,
    // Using underscored naming for attributes (e.g., date_created) in the database
    underscored: true,
    // Defining the model name for the database
    modelName: 'post',
  }
);

// Exporting the Post model for use in other parts of the application
module.exports = Post;
