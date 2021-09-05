const router = require('express').Router();
const { Recipe, User } = require("../../models");
const sequelize = require('../../config/connection');
const withAuth = require('../../utils/auth');

router.get('/', (req, res) => {
    console.log('======================');
    Recipe.findAll({
        // Query configuration
        // order: [['created_at', 'DESC']],
        attributes: [
            'id',
            // 'post_url',
            'title',
            'instructions'
            // [sequelize.literal('(SELECT COUNT(*) FROM vote WHERE post.id = vote.post_id)'), 'vote_count']
          ],
          include: [
            // include the Comment model here:
            // {
            //   model: Comment,
            //   attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'],
            //   include: {
            //     model: User,
            //     attributes: ['username']
            //   }
            // },
            {
              model: User,
              attributes: ['username']
            }
          ]
         })
        .then(dbPostData => res.json(dbPostData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

router.post('/', withAuth, (req, res) => {
    // expects {title: 'Taskmaster goes public!', post_url: 'https://taskmaster.com/press', user_id: 1}
    Recipe.create({
        title: req.body.title,
        instructions: req.body.instructions,
        user_id: req.session.user_id
    })
        .then(dbPostData => res.json(dbPostData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

module.exports = router;