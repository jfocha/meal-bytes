require('dotenv').config()
// be sure to add "API_KEY = 5ba6255aa5cc37d9defcd3858ff211fe—" in your .env

router.get('/', async (request, response) => {
    const api_key = process.env.API_KEY;
    const recipe_url = `https://api.edamam.com/${api_key}/recipes/v2`;
    const res = await fetch(recipe_url);
    const data = await res.json();

    console.log(data.results)
    // do what you'd like with data.results
})
