const newPost = () => {
    document.location.replace('/new-post')
}

const createPost = async (event) => {
    event.preventDefault();

    const content = document.querySelector('#content').value


    if (content) {
        const response = await fetch('/api/blog-posts/create-post', {
          method: 'POST',
          body: JSON.stringify({ content }),
          headers: { 'Content-Type': 'application/json' },
        }); 
    
        if (response.ok) {
          document.location.replace('/home');
        } else {
          alert(response.statusText);
        }
      }
}

const newPostBtn = document.querySelector('#new-post').addEventListener('click', newPost)
const createPostBtn = document.querySelector('#create-post').addEventListener('click', createPost)