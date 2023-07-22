const express= require("express");
const errorhandler = require("./middleware/errorhandler");
const app=express();
const dotenv= require("dotenv").config();
const connectdb=require("./config/dbconnect")
const cookieParser = require("cookie-parser");
const path = require("path")
app.use(express.static(path.join(__dirname,"public")));
app.use(express.urlencoded({extended: true}));
app.set("view engine","ejs");

app.use(cookieParser());
connectdb();
const port=process.env.PORT || 5000;

app.get("/home",(req,res)=>{
    res.send("hello")
})



//built in middleware for accepting the json input form 
//post  method
app.use(express.json());

// custom middleware for converting the error to json
app.use(errorhandler)

app.use("/contact",require("./routes/contactroutes"));
app.use("/user",require("./routes/user"));
// middleware should be use properly the route here is contact means we need to 
//  write localhost:5001/contact/routewhichismentionedinthecontactroutes
app.listen(port,()=>{
    console.log("server is running");
})