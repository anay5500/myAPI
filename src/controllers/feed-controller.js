exports.getposts = (req,res,next)=>{
res.status(200).json({posts:[{title : 'first post' , content:'this is my first post'}]
});
};

exports.createposts=(req,res,next)=>{
    const title= req.body.title;
        const content= req.body.content;
        console.log(title.content); 
    res.status(201).json({

        
        message: 'post created sucessfully',
        post: {
            id: new Date().toISOString(), title : title , content: content
        }
    });

};