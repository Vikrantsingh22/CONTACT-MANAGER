// it is controller for serving user.js in routes
//@route post request /user/register

const asyncHandler = require("express-async-handler");
const usermodel =require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const path = require("path");

const signupform = asyncHandler(async(req,res)=>{
    res.sendFile(path.join(__dirname,"../views/signup.html"));
  })
  

const registeruser = asyncHandler(async(req, res)=>{
    const { username, email, password } = req.body;
    if(!username || !email || !password){
        res.status(400);
        throw new Error("all fields are mandatory");
    }
    // check whether user with same email already exist or
    //not
    // we have to provide the email inside an object
    const availableuser = await usermodel.findOne( {email} );
    if(availableuser){
        throw new Error("user already exist");
    }

    // we are accepting password and the password that is 
    // being provided is raw password therefore we are goign
    // going to hash the password using bcrypt library

    // hashed password
    //bcrypt also returns the promise
    // in hash("password","no.ofsaltrounds")
    const hashedpassword = await bcrypt.hash(password, 10);
    // console.log("hashed password",hashedpassword);
    const userdoc = await usermodel.create({
        username,
        email,
        password: hashedpassword,
    });
    // console.log("user credentials",userdoc);
    // if user is created successfully
    if(userdoc){
        // res.status(201).json({_id:userdoc.id, email:userdoc.email});
        res.status(201).sendFile(path.join(__dirname,"../views/login.html"));
    }else{
        res.status(400);
        throw new Error("user registration unsuccessful");
    }
    // res.json({ message: "register the user"});
});


//LOGIN
// it is controller method for userlogin post request from
// from /routes/user
//@route post request /user/login

const loginform = asyncHandler(async(req,res)=>{
  res.sendFile(path.join(__dirname,"../views/login.html"));
})

const loginuser = asyncHandler(async(req,res)=>{
    //fetch email and password from body
    const { email, password } = req.body;
    if(!email || !password){
        res.status(400);
        throw new Error("all fields are mandatory");
    }
   // after fetching information check whether the user is 
   // available or not
   // always remember provide the info inside object in findone()
   const availableuser =await usermodel.findOne({email});
   // we have to check 2 conditions 
   // condition 1 whether user is available or not 
   // condition 2 the password fetch from the body is same as password inside the user model
   // if( condition1 && condition2 )

    if( availableuser &&  (await bcrypt.compare(password,availableuser.password)) ){
      //provide the  access token 
      // create access token
      //jwt have method of sign in and it take few parameters it will be an object
      // we also need to provide a payload and inside the payload we pass the info that we have to pass
      // parameter are payload,token secret,expiration time
      const accesstoken = jwt.sign({
        user:{
            username: availableuser.username,
            email: availableuser.email,
            id: availableuser.id,
        },
      },
      process.env.TOKEN_SECRET,
      { expiresIn: "1h" }
    //   ,{ expiresIn: "10m" }
      );
    //   res.status(200).json({accesstoken});
      res.status(200).cookie("accesstoken",accesstoken,{
        httpOnly: true,
      }).sendFile(path.join(__dirname,"../views/contactpage.html"));
   }else{
    res.status(400);
    throw new Error("email or password is wrong");
   } 
    // res.json({ message: "login the user"});
});

// it will be a private route as user info should not be shared
// to access this endpoint we will be going to need the access token
//client have to pass the access token
// both way of sending the authorization request is correct
// client is going to pass the access token in the bearer section
// whenever the user is sending a request the token is actually passed in the header section with the authorization field

const currentuser = asyncHandler(async(req,res)=>{
    res.json(req.user);
    // here req.user is from decoded.user inside the validation token
});

module.exports = {registeruser,loginuser,currentuser,loginform,signupform}