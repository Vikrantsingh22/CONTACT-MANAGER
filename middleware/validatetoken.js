const asyncHandler= require("express-async-handler");
const jwt =require("jsonwebtoken");

// authorization header always starts with a bearer
const validationtoken = asyncHandler(async(req,res,next)=>{
    let token;
    let authHeader = req.headers.authorization || req.headers.Authorization;
    // we need to check that auth should starts with Bearer token
    if (authHeader && authHeader.startsWith("Bearer")){
           //fetch the access token
    token = authHeader.split(" ")[1];
    // here we knwo that in the headers there is auth field and inside the 
    // auth field at 0 index Bearer is written and after " " space token is written
    // therefore we are acccessing index 1 with space
    jwt.verify(token, process.env.TOKEN_SECRET,(err, decoded) =>{
    if(err){
        res.status(401);
        throw new Error("user is not authorized");
    }
    // here we are accesing the decode message we can see decoded.user the user is the one that we have stored during the login you can review it in
    // the user.js in controller folder 
    //since we are using a middleware and whenever we have a request this middlware is going to decode the token and then it is going to
    // add the req.user property 
      req.user= decoded.user;
      next();
    });

    if(!token){
        res.status(401);
        throw new Error("token is missinng or user is not user is not authorized");
    }
    }

});
module.exports = validationtoken;