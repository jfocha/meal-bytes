require('dotenv').config()
const axios = require('axios');
// be sure to add "API_KEY = 5ba6255aa5cc37d9defcd3858ff211fe—" "APP_ID = f4cb9a24" in your .env
const router = require('express').Router();
const { Recipe, Ingredient } = require("../models");
const sequelize = require('../config/connection');

// api/recipe/display
router.get('/display', async (request, response) => {
    // const api_key = process.env.API_KEY;
    // const app_id = process.env.APP_ID;
    // // const recipe_url = `https://api.edamam.com/${api_key}/recipes/v2`;
    // const recipe_url = `https://api.edamam.com/api/recipes/v2?type=public&q=chicken&app_id=${app_id}&app_key=${api_key}`;
    // console.log(recipe_url);
    // try {
    //     const res = await axios.get(recipe_url);
    //     console.log(res.data.hits)
    //     // const data = await res.json();
    //     const recipe = res.data.hits;
    //     // res.map(recipes => recipes.get({ plain: true }));
    //     // response.json(data);
    //     response.render('homepage', {
    //       recipe,
    //       // loggedIn: req.session.loggedIn
    //     })
    // } catch (error) {
    //     console.log(error.message);
    // }
    // .then(dbPostData => {
    //   // serialize the entire array dbPostData
    //   const posts = dbPostData.map(post => post.get({ plain: true }));
    //   // pass a single post object into the homepage template
    //   response.render('homepage', {
    //     posts,
    //     loggedIn: req.session.loggedIn
    //   });
    // console.log(res)
    // const data = await res.json();

    // console.log(data.results)
    // do what you'd like with data.results
    // response.json(data);
})

// // GET /api/recipes
// router.get('/', (req, res) => {
//     console.log(req.session);
//     Recipe.findAll({
//         attributes: ['title', 'ingredients_id', 'instructions']
//     })
//         .then(dbRecipeData => res.json(dbRecipeData))
//         .catch(err => {
//             console.log(err);
//             res.status(500).json(err);
//         });
// });

// POST /api/recipes/ingredients
router.post('/ingredients', (req, res) => {
    // for each ingredient entered. or checked?

    
            Ingredient.create({
                ingredient: req.body.ingredient,
                // recipe_id: dbInstructionsData.id,
                // use the id from the session
                // user_id: req.session.user_id
            })
        .then(dbIngredientData => res.json(dbIngredientData))
        .catch(err => {
            console.log(err);
            res.status(400).json(err);
        });
});

// use seeds for sequelize to populate the database with ingredients

// POST /api/recipes/instructions
router.post('/instructions', (req, res) => {
    // https://stackoverflow.com/questions/40866083/is-there-a-way-to-save-multiple-embedded-models-in-db-at-once-using-sequelize
    const recipe = {
        title: req.body.title,
        instructions: req.body.instructions,
        Ingredient: [
          {
            ingredients_id: '1',
          },
          {
            ingredients_id: '2',
          },
        ],
      };
      
    // expects {username: 'Lernantino', email: 'lernantino@gmail.com', password: 'password1234'}
    sequelize.transaction(t => 
        Recipe.create(recipe, {
            
        
          include: [{
            model: Ingredient,
            as: 'Ingredient',
          }],
          transaction: t,
        })
      )
    //   .catch(e => console.log('the txn failed because', e))
    
    // Recipe.create({
    //     instructions: req.body.instructions,
    //     title: req.body.title
    //     // ingredients_id: dbIngredientData.id,
    //     // use the id from the session
    //     // user_id: req.session.user_id
    // })
        .then(dbInstructionsData =>
            res.json(dbInstructionsData)
            )
        .then(dbRecipeData => res.json(dbRecipeData))
        .catch(err => {
            console.log(err);
            res.status(400).json(err);
        });
});

module.exports = router;