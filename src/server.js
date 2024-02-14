const express = require('express');
const bodyparser = require('body-parser');
const feedroutes = require('./routes/feed-route');
const mongoose = require('mongoose');
const app = express();

app.use(bodyparser.json());

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Meathods', '*');
    res.setHeader('Access-Control-Allow-Headers', '*');
    next();
});
app.use('/feed', feedroutes);


mongoose.connect('mongodb+srv://ACCOUNT:<PASSWORD>@cluster0.n5ohx7d.mongodb.net/?retryWrites=true&w=majority')
    .then(result => { app.listen(5000); }).catch(err => { console.log(err); })
