const router = require('express').Router();
const sequelize = require('../config/connection');
const { User } = require('../models');
const axios = require('axios');
require('dotenv').config()

// hard coded test route
router.get('/', (req, res) => {
  console.log(req.session);
  User.findAll({
    attributes: ['username']
  })
    .then(dbPostData => {
      const api_key = process.env.API_KEY;
      const app_id = process.env.APP_ID;
      // const recipe_url = `https://api.edamam.com/${api_key}/recipes/v2`;
      const recipe_url = `https://api.edamam.com/api/recipes/v2?type=public&q=chicken&app_id=${app_id}&app_key=${api_key}`;
      console.log(recipe_url);

      // const res = 
      axios.get(recipe_url).then(recipeData => {
        const recipe = recipeData.data.hits;
        const posts = dbPostData.map(post => post.get({ plain: true }));
        // pass a single post object into the homepage template

        res.render('homepage', {
          recipe,
          posts,
          loggedIn: req.session.loggedIn
        });
      })
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.get('/login', (req, res) => {
  if (req.session.loggedIn) {
    res.redirect('/');
    return;
  }

  res.render('login');
});

router.get('/signup', (req, res) => {
  if (req.session.loggedIn) {
    res.redirect('/');
    return;
  }

  res.render('signup');
});

module.exports = router;