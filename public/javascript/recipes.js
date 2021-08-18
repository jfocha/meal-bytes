// require('dotenv').config();
// const api_key = process.env.API_KEY;
// const app_id = process.env.APP_ID;
// const recipeSearched = document.getElementById("searchedRecipe").value; //get this from the db. Will look like this: recipe_10abfbc20e802c832453500bcc50e1bd
// const recipeByIngredientUrl = `https://api.edamam.com/api/recipes/v2?type=public&q=${recipeSearched}&app_id=${app_id}&app_key=${api_key}`
// const recipeByIdUrl = `https://api.edamam.com/api/recipes/v2/${recipe_id}?type=public&app_id=${app_id}&app_key=${api_key}`;

async function recipeSearchFormHandler(event) {
    event.preventDefault();

    const recipeSearched = document.querySelector('#searched-recipe').value.trim();

    if (recipeSearched) {
        const response = await fetch('/dashboard', {
            method: 'post',
            body: JSON.stringify({
                recipeSearched
            }),
            headers: { 'Content-Type': 'application/json' }
        });

        if (response.ok) {
            console.log('found recipe!');
            document.location.replace('/searched');
          } else {
            alert(response.statusText);
          }
    }
}

document.querySelector('.recipe-submit').addEventListener('submit', recipeSearchFormHandler);

    // getSingleRecipe(recipeByIdUrl);

    // async function getSingleRecipe(url) {
    //     const res = await fetch(url);
    //     const data = await res.json();
    //     console.log(data.results)




    // }



    // write another function that searches for recipes