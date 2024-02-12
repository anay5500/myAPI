const express=require('express');

const router=express.Router();

const feedcontroller =require('../controllers/feed-controller');

router.get('/posts',feedcontroller.getposts);
router.post('/post',feedcontroller.createposts);

module.exports=router;