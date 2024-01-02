const router = require('express').Router();
const { User } = require('../../models');

// POST route to create new user
router.post('/sign-up', async (req, res) => {
  try {
    // Using data from the request body to create new user in the database
    const dbUserData = await User.create({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
    });

    // Setting session user_id to the new users id and making the logged_in status true
    req.session.save(() => {
      req.session.user_id = dbUserData.id;
      req.session.logged_in = true;

      res.json({ user: dbUserData, message: 'Successfully created account!' });
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }


});

// POST route for logging in
router.post('/login', async (req, res) => {
  try {
    // Finding user based off the email they entered
    const userData = await User.findOne({ where: { email: req.body.email } });

    if (!userData) {
      res
        .status(400)
        .json({ message: 'Incorrect email or password, please try again' });
      return;
    }

    // Checking if the password matches the hashed password from the database
    const validPassword = await userData.checkPassword(req.body.password);

    // If password doesn't match, throw an error
    if (!validPassword) {
      res
        .status(400)
        .json({ message: 'Incorrect email or password, please try again' });
      return;
    }

    // If the password matches set the session user_id to the current users ID,
    // AND set the session logged_in status to TRUE
    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;

      res.json({ user: userData, message: 'You are now logged in!' });
    });

  } catch (err) {
    res.status(400).json(err);
  }
});

// POST route for logging out
router.post('/logout', (req, res) => {
  // Kill the session
  if (req.session.logged_in) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});


// Export the router
module.exports = router;