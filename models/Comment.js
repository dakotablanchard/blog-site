// Importing necessary modules from sequelize for defining models and data types
const { Model, DataTypes } = require('sequelize');

// Importing the sequelize connection configuration
const sequelize = require('../config/connection');

// Defining the Comment model by extending the sequelize Model class
class Comment extends Model {}

// Initializing the Comment model with its attributes and data types
Comment.init(
  {
    // Unique identifier for each comment, automatically incremented
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    // Text content of the comment
    comment: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    // Date and time when the comment was created, defaulting to the current timestamp
    date_created: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    // Foreign key referencing the associated post's unique identifier
    post_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'post',
        key: 'id',
      },
    },
    // Foreign key referencing the user who created the comment
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
    modelName: 'comment',
  }
);

// Exporting the Comment model for use in other parts of the application
module.exports = Comment;
