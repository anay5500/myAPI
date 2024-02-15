const express=require('express');
const { body } = require('express-validator');
const authcontroller= require('../controllers/auth-controller');

const router=express.Router();

router.put('/signup',[
    body('email').isEmail().withMessage('enter a valid email')
.custom((value,{req})=>{
    return User.findOne({email:value}).then(userDoc=>{
        if(userDoc){
            return Promise.reject('E-mail already exists');
        }
    });
})
.normalizeEmail(),
body('password').trim().isLength({min:5}),
body('name').trim().not().isEmpty()
], 
authcontroller.signup);

router.post('/login',authcontroller.login);

module.exports=router;