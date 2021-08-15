const router = require('express').Router();

const homeRoutes = require('./home-routes.js');
const apiRoutes = require('./api');
const recipes = require('./recipes-routes.js');

router.use('/', homeRoutes);
router.use('/api', apiRoutes);
router.use('/recipes', recipes);

router.use((req, res) => {
  res.status(404).end();
});

module.exports = router;