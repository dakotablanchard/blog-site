// Async function to handle the submission of a new comment
const createComment = async (event) => {
  event.preventDefault();

  // Extracting the post ID from the current URL
  const url = new URL(window.location.href);
  const path = url.pathname;
  const postId = path.split('/').pop();
  
  // Retrieving the comment content from the form input
  const comment = document.querySelector('#comment').value;

  // Checking if both comment and postId are provided
  if (comment && postId) {
      // Sending a POST request to create a new comment for the specified post
      const response = await fetch('/api/blog-posts/create-comment', {
        method: 'POST',
        body: JSON.stringify({ comment, postId }),
        headers: { 'Content-Type': 'application/json' },
      }); 
  
      // Reloading the page if the request is successful; showing an alert otherwise
      if (response.ok) {
        document.location.reload();
      } else {
        alert(response.statusText);
      }
  }
}

// Event listener for the "Add Comment" button click
document.querySelector('#add-comment').addEventListener('click', createComment);