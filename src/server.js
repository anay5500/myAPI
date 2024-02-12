const express=require('express');
const bodyparser=require('body-parser');
const feedroutes=require('./routes/feed-route');
const app=express();

app.use(bodyparser.json());

app.use((req,res,next) => {
res.setHeader('Access-Control-Allow-Origin','*');
res.setHeader('Access-Control-Allow-Meathods','*');
res.setHeader('Access-Control-Allow-Headers','*');
next();
});

app.use('/feed',feedroutes);
app.listen('5000');