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

const editPost = (event) => {
  event.preventDefault();

  // Show the save button
  document.getElementById('save-changes').style.display = 'block';

  // Make the title and content editable
  const postTitle = document.getElementById('post-title');
  postTitle.contentEditable = true;

  const postContent = document.getElementById('post-content');
  postContent.contentEditable = true;

  postContent.focus();
}

document.querySelector('#dashboard').addEventListener('click', goToDashboard)
document.querySelector('#create-post').addEventListener('click', createPost)
document.querySelector('#edit-post').addEventListener('click', editPost)