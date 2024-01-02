// Async function to handle the submission of the login form
const loginFormHandler = async (event) => {
  event.preventDefault();

  // Retrieving email and password from form inputs
  const email = document.querySelector('#email-login').value.trim();
  const password = document.querySelector('#password-login').value.trim();

  // Checking if both email and password are provided
  if (email && password) {
    // Sending a POST request to log in the user
    const response = await fetch('/api/users/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
      headers: { 'Content-Type': 'application/json' },
    });

    // Redirecting to the home page if the login is successful; showing an alert otherwise
    if (response.ok) {
      document.location.replace('/home');
    } else {
      alert(response.statusText);
    }
  }
};

// Async function to handle the submission of the signup form
const signupFormHandler = async (event) => {
  event.preventDefault();

  // Retrieving name, email, and password from form inputs
  const name = document.querySelector('#name-signup').value.trim();
  const email = document.querySelector('#email-signup').value.trim();
  const password = document.querySelector('#password-signup').value.trim();

  // Checking if name, email, and password are provided
  if (name && email && password) {
    // Sending a POST request to sign up the user
    const response = await fetch('/api/users/sign-up', {
      method: 'POST',
      body: JSON.stringify({ name, email, password }),
      headers: { 'Content-Type': 'application/json' },
    });

    // Redirecting to the home page if the signup is successful; showing an alert otherwise
    if (response.ok) {
      document.location.replace('/home');
    } else {
      alert(response.statusText);
    }
  }
};

// Function to redirect to the login page when the login button is clicked
const homeLogin = () => {
  document.location.replace('/login');
};

// Event listeners for button clicks and form submissions
document.querySelector('#login-navbar').addEventListener('click', homeLogin);
document.querySelector('.login-form').addEventListener('submit', loginFormHandler);
document.querySelector('.signup-form').addEventListener('submit', signupFormHandler);