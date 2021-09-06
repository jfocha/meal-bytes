const router = require('express').Router();
const sequelize = require('../config/connection');
const { Recipe, Ingredient, User } = require('../models');
const withAuth = require('../utils/auth');
const axios = require('axios');
const Recipe_Ingredient = require('../models/Recipe_Ingredient');

// GET /dashboard
router.get('/', withAuth, (req, res) => {
  // Ingredient.findAll({
  //   attributes: [
  //     'id',
  //     'ingredient'
  //     // get ingredients from through table here
  //     // [sequelize.literal('(SELECT COUNT(*) FROM vote WHERE post.id = vote.post_id)'), 'vote_count']
  // ],
  // })
  // .then(dbPostData => {
  //   const ingredients = dbPostData.map(ingredient => ingredient.get({ plain: true }));
  //           res.render('dashboard', { ingredients, loggedIn: true });
  //       })

  Recipe.findAll({
        where: {
            // use the ID from the session
            user_id: req.session.user_id
        },
        attributes: [
            'id',
            'title',
            'instructions'
            // get ingredients from through table here
            //[sequelize.literal('(SELECT ingredient FROM recipe LEFT JOIN Recipe_Ingredient ON Recipe_Ingredient.recipe_id = recipe.id LEFT JOIN ingredient ON ingredient.id = Recipe_Ingredient.ingredient_id;)'), ]
        ],
        include: [
            {
                model: User,
                attributes: ['username']
            },
            {
              model: Ingredient,
              through: [Recipe_Ingredient],
              attributes: ['ingredient']
              // where: {
              //   recipe_id: 1
              // }
          },

        ],

    })
        .then(dbPostData => {

            // const api_key = process.env.API_KEY;
            // const app_id = process.env.APP_ID;
            // const recipeSearched = document.getElementById("searchedRecipe").value; //get this from the db. Will look like this: recipe_10abfbc20e802c832453500bcc50e1bd
            // const recipeByIngredientUrl = `https://api.edamam.com/api/recipes/v2?type=public&q=${recipeSearched}&app_id=${app_id}&app_key=${api_key}`
            // const recipeByIdUrl = `https://api.edamam.com/api/recipes/v2/${recipe_id}?type=public&app_id=${app_id}&app_key=${api_key}`;
            
            // // const recipe_url = `https://api.edamam.com/api/recipes/v2/recipe_10abfbc20e802c832453500bcc50e1bd?type=public&app_id=${app_id}&app_key=${api_key}`;
            
            // console.log(recipeByIngredientUrl);
      
            // // // const res = 
            // axios.get(recipe_url).then(recipeData => {
            //   // const recipe = recipeData.data.hits;
              

            // serialize data before passing to template
            const recipes = dbPostData.map(recipe => recipe.get({ plain: true }));
            res.render('dashboard', { recipes, loggedIn: true });
        })
        // .then(dbPostData => {
        //   const api_key = process.env.API_KEY;
        //   const app_id = process.env.APP_ID;
        //   const recipeSearched = req.body.recipeSearched;
        //   console.log(recipeSearched);
        //   const recipeByIngredientUrl = `https://api.edamam.com/api/recipes/v2?type=public&q=${recipeSearched}&app_id=${app_id}&app_key=${api_key}`;
        //   console.log(recipeByIngredientUrl);

        //   axios.get(recipeByIngredientUrl).then(recipeData => {
        //     const recipe = recipeData.data.hits;
        //     const posts = dbPostData.map(post => post.get({ plain: true }));
        //     // pass a single post object into the homepage template
    
        //     res.render('dashboard', {
        //       recipe,
        //       posts,
        //       loggedIn: req.session.loggedIn
        //     });
        //   })
        // })
    // })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

router.get('/edit/:id', withAuth, (req, res) => {
    Post.findOne({
        where: {
          id: req.params.id
        },
        attributes: [
          'id',
          'post_url',
          'title',
          'created_at',
          [sequelize.literal('(SELECT COUNT(*) FROM vote WHERE post.id = vote.post_id)'), 'vote_count']
        ],
        include: [
          {
            model: Comment,
            attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'],
            include: {
              model: User,
              attributes: ['username']
            }
          },
          {
            model: User,
            attributes: ['username']
          }
        ]
      })
        .then(dbPostData => {
          if (!dbPostData) {
            res.status(404).json({ message: 'No post found with this id' });
            return;
          }
    
          // serialize the data
          const post = dbPostData.get({ plain: true });
    
          // pass data to template
          res.render('edit-post', {
            post,
            loggedIn: true
           });
        })
        .catch(err => {
          console.log(err);
          res.status(500).json(err);
        });
    });

    router.get('/', (req, res) => {
      // if (req.session.loggedIn) {
      //   res.redirect('/');
      //   return;
      // }
      
  res.render('dashboard');
});

// POST /dashboard
    router.post('/', withAuth, (req, res) => {
      Post.findAll({
        where: {
            // use the ID from the session
            user_id: req.session.user_id
        },
        attributes: [
            'id',
            'post_url',
            'title',
            'created_at',
            [sequelize.literal('(SELECT COUNT(*) FROM vote WHERE post.id = vote.post_id)'), 'vote_count']
        ],
        include: [
            {
                model: Comment,
                attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'],
                include: {
                    model: User,
                    attributes: ['username']
                }
            },
            {
                model: User,
                attributes: ['username']
            }
        ]
    })
        .then(dbPostData => {
          const api_key = process.env.API_KEY;
          const app_id = process.env.APP_ID;
          const recipeSearched = req.body.recipeSearched;
          // console.log(recipeSearched);
          const recipeByIngredientUrl = `https://api.edamam.com/api/recipes/v2?type=public&q=${recipeSearched}&app_id=${app_id}&app_key=${api_key}`;
          console.log(recipeByIngredientUrl);

          axios.get(recipeByIngredientUrl).then(recipeData => {
            const recipeStuff = recipeData.data.hits;
            // console.log(recipe);
            if (recipeStuff){
            const recipe = recipeStuff;
            console.log("-------Start Recipe----------")
              console.log(recipe)
              console.log("-------End Recipe----------")
            const posts = dbPostData.map(post => post.get({ plain: true }));
            // pass a single post object into the homepage template
              // const test = {test1: "test"};
              // console.log("route " + test);
              res.json(recipe);
            // res.render('dashboard', {
            //   recipe,
            //   posts,
            //   loggedIn: req.session.loggedIn
            // });
          }
          })
        })
        .catch(err => {
          console.log(err);
          res.status(500).json(err);
        });
    //         // const api_key = process.env.API_KEY;
    //         // const app_id = process.env.APP_ID;
    //         // const recipeSearched = document.getElementById("searchedRecipe").value; //get this from the db. Will look like this: recipe_10abfbc20e802c832453500bcc50e1bd
    //         // const recipeByIngredientUrl = `https://api.edamam.com/api/recipes/v2?type=public&q=${recipeSearched}&app_id=${app_id}&app_key=${api_key}`
    //         // const recipeByIdUrl = `https://api.edamam.com/api/recipes/v2/${recipe_id}?type=public&app_id=${app_id}&app_key=${api_key}`;
            
    //         // // const recipe_url = `https://api.edamam.com/api/recipes/v2/recipe_10abfbc20e802c832453500bcc50e1bd?type=public&app_id=${app_id}&app_key=${api_key}`;
            
    //         // console.log(recipeByIngredientUrl);
      
    //         // // // const res = 
    //         // axios.get(recipe_url).then(recipeData => {
    //         // //   const recipe = recipeData.data.hits;
    });

module.exports = router;