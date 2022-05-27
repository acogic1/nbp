const express = require('express');
const router = new express.Router();
const users = require('../controllers/users.js');
const comments = require('../controllers/comments.js');
const postlinks = require('../controllers/postlinks.js');
const posts = require('../controllers/posts.js');
const votes = require('../controllers/votes.js');
const linktypes = require('../controllers/linktypes.js');
const posttypes = require('../controllers/posttypes.js');
const votetypes = require('../controllers/votetypes.js');
const badges = require('../controllers/badges.js');

router.route('/users/:id?')
  .get(users.get)
  .post(users.post)
  .put(users.put)
  .delete(users.delete);
  
router.route('/comments/:id?')
  .get(comments.get)
  .post(comments.post)
  .put(comments.put)
  .delete(comments.delete);
  
router.route('/postlinks/:id?')
  .get(postlinks.get)
  .post(postlinks.post)
  .put(postlinks.put)
  .delete(postlinks.delete);
  
router.route('/posts/:id?')
  .get(posts.get)
  .post(posts.post)
  .put(posts.put)
  .delete(posts.delete);
  
router.route('/votes/:id?')
  .get(votes.get)
  .post(votes.post)
  .put(votes.put)
  .delete(votes.delete);
  
router.route('/linktypes/:id?')
  .get(linktypes.get)
  .post(linktypes.post)
  .put(linktypes.put)
  .delete(linktypes.delete);

router.route('/posttypes/:id?')
  .get(posttypes.get)
  .post(posttypes.post)
  .put(posttypes.put)
  .delete(posttypes.delete);
  
router.route('/votetypes/:id?')
  .get(votetypes.get)
  .post(votetypes.post)
  .put(votetypes.put)
  .delete(votetypes.delete);
  
router.route('/badges/:id?')
  .get(badges.get)
  .post(badges.post)
  .put(badges.put)
  .delete(badges.delete);

module.exports = router;