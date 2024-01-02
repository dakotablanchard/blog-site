// Importing necessary modules from sequelize for defining models and data types
const { Model, DataTypes } = require('sequelize');
// Importing bcrypt for password hashing
const bcrypt = require('bcrypt');
// Importing the sequelize connection configuration
const sequelize = require('../config/connection');

// Defining the User model by extending the sequelize Model class
class User extends Model {
  // Method to check if the provided password matches the hashed password stored in the database
  checkPassword(loginPw) {
    return bcrypt.compareSync(loginPw, this.password);
  }
}

// Initializing the User model with its attributes and data types
User.init(
  {
    // Unique identifier for each user, automatically incremented
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    // Name of the user
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    // Email of the user, unique and must be a valid email format
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    // Password of the user, must be at least 8 characters long
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [8],
      },
    },
  },
  {
    // Hooks to hash the password before creating a user
    hooks: {
      beforeCreate: async (newUserData) => {
        newUserData.password = await bcrypt.hash(newUserData.password, 10);
        return newUserData;
      },
      beforeUpdate: async (updatedUserData) => {
        updatedUserData.password = await bcrypt.hash(updatedUserData.password, 10);
        return updatedUserData;
      },
    },
    // Using the sequelize connection
    sequelize,
    // Disabling timestamps for this model
    timestamps: false,
    // Ensuring the table name in the database matches the model name
    freezeTableName: true,
    // Using underscored naming for attributes (e.g., date_created) in the database
    underscored: true,
    // Defining the model name for the database
    modelName: 'user',
  }
);

// Exporting the User model for use in other parts of the application
module.exports = User;
