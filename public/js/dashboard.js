const goToDashboard = () => {
    document.location.replace('/dashboard')
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

document.querySelector('#dashboard').addEventListener('click', goToDashboard)
document.querySelector('#create-post').addEventListener('click', createPost)