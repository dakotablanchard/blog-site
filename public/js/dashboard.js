// Function to redirect to the dashboard page
const goToDashboard = () => {
  document.location.replace('/dashboard');
}

// Async function to create a new blog post
const createPost = async (event) => {
  event.preventDefault();

  // Retrieving title and content from form inputs
  const title = document.querySelector('#title').value;
  const content = document.querySelector('#content').value;

  // Checking if both title and content are provided
  if (title && content) {
      // Sending a POST request to create a new blog post
      const response = await fetch('/api/blog-posts/create-post', {
          method: 'POST',
          body: JSON.stringify({ title, content }),
          headers: { 'Content-Type': 'application/json' },
      });

      // Redirecting to the home page if the request is successful; showing an alert otherwise
      if (response.ok) {
          document.location.replace('/home');
      } else {
          alert(response.statusText);
      }
  }
}

// Function to enable post editing mode
const editPost = (postId) => {
  // Hiding all save buttons
  const saveButtons = document.querySelectorAll('.save-changes');
  saveButtons.forEach(button => {
      button.style.display = 'none';
  });

  // Showing the save button for the current post
  const saveButton = document.querySelector(`.save-changes[data-post-id="${postId}"]`);
  if (saveButton) {
      saveButton.style.display = 'block';
  }

  // Enabling content editing for the post title and content
  const postTitle = document.getElementById(`post-title-${postId}`);
  postTitle.contentEditable = true;

  const postContent = document.getElementById(`post-content-${postId}`);
  postContent.contentEditable = true;

  postContent.focus();
}

// Async function to save changes to a blog post
const saveChanges = async (postId) => {
  // Retrieving new title and content from edited post
  const newTitle = document.getElementById(`post-title-${postId}`).innerText;
  const newContent = document.getElementById(`post-content-${postId}`).innerText;

  // Sending a PUT request to update the blog post
  const response = await fetch(`/api/blog-posts/update-post/${postId}`, {
      method: 'PUT',
      body: JSON.stringify({ newTitle, newContent }),
      headers: { 'Content-Type': 'application/json' },
  });

  // Reloading the page if the request is successful; showing an alert otherwise
  if (response.ok) {
      document.location.reload();
  } else {
      alert(response.statusText);
  }
}

// Async function to delete a blog post
const deletePost = async (postId) => {
  // Sending a DELETE request to delete the blog post
  const response = await fetch(`/api/blog-posts/delete-post/${postId}`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
  });

  // Reloading the page if the request is successful; showing an alert otherwise
  if (response.ok) {
      document.location.reload();
  } else {
      alert(response.statusText);
  }
}

// Event listeners for button clicks
document.querySelector('#dashboard').addEventListener('click', goToDashboard);
document.querySelector('#create-post').addEventListener('click', createPost);