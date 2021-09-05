async function newFormHandler(event) {
    event.preventDefault();
  
    const title = document.querySelector('input[name="recipe-title"]').value;
    const instructions = document.querySelector('textarea[name="recipe-instructions"]').value;

    const response = await fetch(`/api/recipe`, {
      method: 'POST',
      body: JSON.stringify({
        title,
        instructions
        // add ingredients here 
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    });
  
    if (response.ok) {
      document.location.replace('/dashboard');
      console.log('Hit it!');
    } else {
      alert(response.statusText);
    }
  }
  
  document.querySelector('.new-recipe-form').addEventListener('submit', newFormHandler);