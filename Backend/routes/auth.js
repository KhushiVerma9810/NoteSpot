const express = require('express');
const User = require('../models/User');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const bcrypt  = require('bcryptjs');
const jwt = require('jsonwebtoken');
const fetchuser = require('../middleware/fetchuser');
const JWT_SECRET = 'khushikiduniya';
//ROUTE 1 create a user using : POST "/api/auth/createuser" dosn't require auth
router.post('/createuser' ,[
  body('name' , 'Enter a valid name').isLength({ min: 3 }),
  body('email' , 'Enter a valid email').isEmail(),
  body('password' , 'Password must be atleast 5 characters').isLength({ min: 5 }),
],async(req ,res )=>{
  let success = false;
  //if there are errors return bad request and the errors
  const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success ,errors: errors.array() });
    }
  // check whether the user with email exist
  try{
   let user = await User.findOne({email:req.body.email});

   if(user){
    return res.status(400).json({error:"Sorry a user with this email already exists"})
   }
   const salt = await bcrypt.genSalt(10);
   const  secPass = await bcrypt.hash(req.body.password , salt);
   //create a new user
   user = await User.create({
     name: req.body.name,
     email: req.body.email,
      password: secPass
    });
    const data={
      user:{
        id:user.id
      }
    }
    const authToken= jwt.sign(data , JWT_SECRET);
    // .then(user => res.json(user)).catch(err=>{console.log(err)
    // res.json({error:'Please enter a unique value for email' , message: err.message})})

       success = true;
         res.send({success ,authToken})
}catch(error){
  console.log(error.message);
  res.status(500).send("Internal server error");
}
})
//ROUTE 2 :Authenticate a user using:POST "/api/auth/login" , no login required
router.post('/login' ,[

  body('email' , 'Enter a valid email').isEmail(),
  body('password' , 'Password cannot be blank').exists(),
],async(req ,res )=>{
   let success = false;

  //if there are errors , return bad request and the errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
const {email , password} = req.body;
try{
  let user = await User.findOne({email});
  if(!user){
    return res.status(400).json({error:"Please try to login with correct credentials"});
  }
  const passwordCompare = await bcrypt.compare(password , user.password);
  if(!passwordCompare){
    success = false;
    return res.status(400).json({success , error:"Please try to login with correct credentials"});
  }

    const data={
      user:{
        id: user.id
      }
    }
    const authToken= jwt.sign(data , JWT_SECRET);
     success = true;
    res.json({success , authToken})
  } catch(error){
    console.log(error.message);
  res.status(500).send("internal server error");
  }

});
//ROUTE 3:Get logged in user Details:POST"/api/auth/getuser" , Login required
router.post('/getuser' ,fetchuser ,async(req ,res )=>{
try {
  userID = req.user.id;
  const user = await User.findById(userID).select("password");
  res.send(user)
} catch (error) {
  console.log(error.message);
  res.status(500).send("internal server error");
}
});
module.exports = router