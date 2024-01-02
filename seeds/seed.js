// FOR TESTING PURPOSES ONLY
// RUNNING THIS CODE SEEDS THE DATABASE WITH TEST DATA

// Importing sequelize and model instances for User and Post
const sequelize = require('../config/connection');
const { User, Post } = require('../models');

// Importing seed data for users and posts
const userData = require('./userData.json');
const postData = require('./postData.json');

// Function to seed the database with user and post data
const seedDatabase = async () => {
  // Synchronizing the database and resetting it (force: true)
  await sequelize.sync({ force: true });

  // Creating users with individual hooks (e.g., hashing passwords) and returning the results
  const users = await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });

  // Iterating over post data and creating posts with random user associations
  for (const post of postData) {
    await Post.create({
      ...post,
      user_id: users[Math.floor(Math.random() * users.length)].id,
    });
  }

  // Exiting the process after seeding the database
  process.exit(0);
};

// Invoking the seedDatabase function
seedDatabase();
