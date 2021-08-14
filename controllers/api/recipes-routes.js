require('dotenv').config()
const axios = require('axios');
// be sure to add "API_KEY = 5ba6255aa5cc37d9defcd3858ff211fe—" "APP_ID = f4cb9a24" in your .env
const router = require('express').Router();
const { Recipe, Ingredient } = require("../../models");

// router.get('/', async (request, response) => {
//     const api_key = process.env.API_KEY;
//     const app_id = process.env.APP_ID;
//     // const recipe_url = `https://api.edamam.com/${api_key}/recipes/v2`;
//     const recipe_url = `https://api.edamam.com/api/recipes/v2?type=public&q=chicken&app_id=${app_id}&app_key=${api_key}%E2%80%94`;
//     console.log(recipe_url);
//     try {
//         const res = await axios.get(recipe_url);
//         console.log(res)
//         const data = await res.json();
//     } catch (error) {
//         console.log(error.message);
//     }
    
//     // console.log(res)
//     // const data = await res.json();

//     // console.log(data.results)
//     // do what you'd like with data.results
//     response.json([]);
// })

// GET /api/recipes
router.get('/', (req, res) => {
    console.log(req.session);
    Recipe.findAll({
        attributes: ['id'] 
      })
      .then(dbRecipeData => res.json(dbRecipeData))
      .catch(err => {
          console.log(err);
          res.status(500).json(err);
      });
});

// POST /api/recipes
router.post('/', (req, res) => {
    // expects {username: 'Lernantino', email: 'lernantino@gmail.com', password: 'password1234'}
    Ingredient.create({
        ingredient: req.body.ingredient,
        
        // use the id from the session
        // user_id: req.session.user_id
    })
    .then(dbIngredientData => 
        
    Recipe.create({
        instructions: req.body.instructions,
        ingredients_id: dbIngredientData.id,
        // use the id from the session
        // user_id: req.session.user_id
    }))
    .then(dbRecipeData => res.json(dbRecipeData))
    .catch(err => {
      console.log(err);
      res.status(400).json(err);
    });
});

module.exports = router;