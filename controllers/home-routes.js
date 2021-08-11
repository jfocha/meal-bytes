const router = require('express').Router();
const sequelize = require('../config/connection');
const { User } = require('../models');

// hard coded test route
router.get('/', (req, res) => {
    console.log(req.session);
    User.findAll({
        attributes: ['username'] 
      })
        .then(dbPostData => {
          // serialize the entire array dbPostData
          const posts = dbPostData.map(post => post.get({ plain: true }));
          // pass a single post object into the homepage template
          res.render('homepage', {
            posts,
            loggedIn: req.session.loggedIn
          });
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