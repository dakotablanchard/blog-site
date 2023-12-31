const goToDashboard = () => {
    document.location.replace('/dashboard')
}

const createPost = async (event) => {
    event.preventDefault();

    const title = document.querySelector('#title').value
    const content = document.querySelector('#content').value

    console.log(title, content)

    if (title && content) {
        const response = await fetch('/api/blog-posts/create-post', {
          method: 'POST',
          body: JSON.stringify({ title, content }),
          headers: { 'Content-Type': 'application/json' },
        }); 
    
        if (response.ok) {
          document.location.replace('/home');
        } else {
          alert(response.statusText);
        }
      }
}

const editPost = (postId) => {

  // Hide all "Save Changes" buttons
  const saveButtons = document.querySelectorAll('.save-changes');
  saveButtons.forEach(button => {
    button.style.display = 'none';
  });

  // Show the "Save Changes" button for the specific post
  const saveButton = document.querySelector(`.save-changes[data-post-id="${postId}"]`);
  if (saveButton) {
    saveButton.style.display = 'block';
  }

  // Make the title and content editable
  const postTitle = document.getElementById(`post-title-${postId}`);
  postTitle.contentEditable = true;

  const postContent = document.getElementById(`post-content-${postId}`);
  postContent.contentEditable = true;

  postContent.focus();

}

const saveChanges = async (postId) => {

  const newTitle = document.getElementById(`post-title-${postId}`).innerText
  const newContent = document.getElementById(`post-content-${postId}`).innerText
  
  const response = await fetch(`/api/blog-posts/update-post/${postId}`, {
    method: 'PUT',
    body: JSON.stringify({ newTitle, newContent }),
    headers: { 'Content-Type': 'application/json' },
  }); 

  if (response.ok) {
    document.location.reload();
  } else {
    alert(response.statusText);
  }
}
document.querySelector('#dashboard').addEventListener('click', goToDashboard)
document.querySelector('#create-post').addEventListener('click', createPost)