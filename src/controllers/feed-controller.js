
const Post = require('../models/post-model');

exports.getposts = (req, res, next) => {

    Post.find().then(posts=>{
        res.status(200).json({message:'Posts fetched', posts:posts})}
        
    )
    .catch(err=>{ if (!err.statusCode){
        err.statusCode=500;
     }
     next(err);
    
     });

   
};


exports.createposts = (req, res, next) => {
    const title = req.body.title;
    const content = req.body.content;
    const post = new Post({
        title: title, content: content,
        imageUrl:'./pxfuel.jpg',
        creator: {
            name: 'ajay'
        }
    });
    post.save().then(result=>{
        console.log(result);

        res.status(201).json({

            message: 'post created sucessfully',
            post: result
        });
    
        
    }).catch(err=>{
        console.log(err);
    })
    
 
};

exports.getpost=(req,res,next)=>{
 const postId=req.params.postId;
 Post.findById(postId)
 .then(post=>{
    if(!post){
        const error=new Error('could not find post');
        error.statusCode=404;
        throw error;
    }
    res.json({message:'Post fetched',post:post});
 })
 .catch(err=>{
    console.log(err);
 })
};