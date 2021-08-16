const api_key = process.env.API_KEY;
const app_id = process.env.APP_ID;
const recipe_id = 0; //get this from the db. Will look like this: recipe_10abfbc20e802c832453500bcc50e1bd
const API_URL = `https://api.edamam.com/api/recipes/v2/${recipe_id}?type=public&app_id=${app_id}&app_key=${api_key}`;



getSingleRecipe(API_URL);

async function getSingleRecipe(url) {
    const res = await fetch(url);
    const data = await res.json();
    console.log(data.results)
    

    
    
}



    // write another function that searches for recipes