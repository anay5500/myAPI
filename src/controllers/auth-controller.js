const User=require('../models/user-model');
const {validationResult}= require('express-validator');
const bcrypt = require('bcryptjs');
const jwt=require('jsonwebtoken');
exports.signup=(req,res,next)=>{
const errors = validationResult(req);


    const email=req.body.email;
    const name=req.body.name;
    const password=req.body.password;

      bcrypt.hash(password,12).then(hashedpw=>{
        const user=new User({
            email:email,
            password: hashedpw,
            name:name
        });
        return user.save();
      })
      .then(result=>{
        res.json({
            message:'user created', userId:result._id
        });
      }).catch(err=>{
        console.log(err);
      })

};

exports.login=(req,res,next)=>{
  const email= req.body.email;
  const password= req.body.password;
  let loadedusers;

User.findOne({email:email})
.then(user=>{
  loadedusers=user;
  return bcrypt.compare(password,user.password);
 
})
.then(isEqual=>{
  const token=jwt.sign({
    email:loadedusers.email,
  userId:loadedusers._id.toString()
},' stringusedasprivatealgo',{expiresIn:'1h'});
res.json({token:token,userId:loadedusers._id.toString()});
})

.catch(err=>{console.log(err);})
};