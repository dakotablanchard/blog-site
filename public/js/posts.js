const createComment = async (event) => {
    event.preventDefault();

    const url = new URL(window.location.href);
    const path = url.pathname;
    const postId = path.split('/').pop();
    
    const comment = document.querySelector('#comment').value

    if (comment && postId) {
        const response = await fetch('/api/blog-posts/create-comment', {
          method: 'POST',
          body: JSON.stringify({ comment, postId }),
          headers: { 'Content-Type': 'application/json' },
        }); 
    
        if (response.ok) {
          document.location.reload();
        } else {
          alert(response.statusText);
        }
      }
}

document.querySelector('#add-comment').addEventListener('click', createComment)