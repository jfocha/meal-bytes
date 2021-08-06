require('dotenv').config()
const axios = require('axios');
// be sure to add "API_KEY = 5ba6255aa5cc37d9defcd3858ff211fe—" "APP_ID = f4cb9a24" in your .env
const router = require('express').Router();

router.get('/', async (request, response) => {
    const api_key = process.env.API_KEY;
    const app_id = process.env.APP_ID;
    // const recipe_url = `https://api.edamam.com/${api_key}/recipes/v2`;
    const recipe_url = `https://api.edamam.com/api/recipes/v2?type=public&q=chicken&app_id=${app_id}&app_key=${api_key}%E2%80%94`;
    console.log(recipe_url);
    try {
        const res = await axios.get(recipe_url);
        console.log(res)
        const data = await res.json();
    } catch (error) {
        console.log(error.message);
    }
    
    // console.log(res)
    // const data = await res.json();

    // console.log(data.results)
    // do what you'd like with data.results
    response.json([]);
})

module.exports = router;