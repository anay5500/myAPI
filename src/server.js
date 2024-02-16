const express = require('express');
const bodyparser = require('body-parser');
const feedroutes = require('./routes/feed-route');
const authroutes = require('./routes/auth-route');
const mongoose = require('mongoose');
const {v4: uuidv4}= require('uuid');
const multer= require('multer');
const app = express();

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods','*');
    res.setHeader('Access-Control-Allow-Headers', '*');
    next();
});


const filestorage=multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,'images');
    },
    filename:(req,file,cb)=>{
        cb(null,uuidv4());
    }
});

const filefilter=(req,file,cb)=>{
    if(file.mimetype==='image/png'|| file.mimetype==='image/jpg'|| file.mimetype==='image/jpeg' ){
        cb(null,true);
    }else{
        cb(null,false);
    }
}


app.use(bodyparser.json());
app.use(multer({storage:filestorage,fileFilter:filefilter}).single('image'));
app.use('/feed', feedroutes);
app.use('/auth',authroutes);

app.use((error,req,res,next)=>{
    console.log(error);
    const status =error.statusCode || 500;
    const message= error.message;
    const data= error.data;
    res.status(status).json({message:message,data:data});
});


mongoose.connect('mongodb+srv://anaypapnoi24:999999999@cluster0.n5ohx7d.mongodb.net/?retryWrites=true&w=majority')
    .then(result => { app.listen(5000); }).catch(err => { console.log(err); })
