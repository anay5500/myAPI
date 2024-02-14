const express = require('express');
//const { body } = require('express-validator/check');

const router = express.Router();

const feedcontroller = require('../controllers/feed-controller');

router.get('/posts', feedcontroller.getposts);
router.post('/post',  feedcontroller.createposts);
router.get('/post/:postId',feedcontroller.getpost );

module.exports = router;