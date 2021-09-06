async function newFormHandler(event) {
    event.preventDefault();
  
    const ingredient = document.querySelector('input[name="ingredient-name"]').value;

    const response = await fetch(`/api/ingredient`, {
      method: 'POST',
      body: JSON.stringify({
        ingredient
        // add ingredients here 
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    });
  
    if (response.ok) {
      document.location.replace('/dashboard');
      console.log('ingredient it!');
    } else {
      alert(response.statusText);
    }
  }
  
  document.querySelector('.new-ingredient-form').addEventListener('submit', newFormHandler);