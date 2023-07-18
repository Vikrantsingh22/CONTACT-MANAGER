//@desc get all contact
//@route GET /contact/
//@access private

// yaha par code ko modularize kar rahe hain
// yaha par hummlog functions create kar rahe hain 
// yeh function ka use routes ke andar karenge
const Contact=require("../models/contactModel");
const contactModel = require("../models/contactModel");

//if we want to use the async function then we need to use th
// catch and try to get the error
// we are using the asynchandler then we can get the
// without using the try and catch
const asynchandler=require("express-async-handler");

//private
//using user_id for making CRUD operations


//example we need to find all the contacts of the user who is logged in
const getContact = asynchandler(async(req,res)=>{
   const contacts=await Contact.find({user_id: req.user.id});
   //because we are going to provide the  access token in the bearer inside AUTH
   //during get contact
    // res.json(req.user.id);
    res.json(contacts);
}
);

//private
const updateContact=asynchandler(async(req,res)=>{
    const contact = await Contact.findById(req.params.id);
    if(!contact){
        res.status(404).json({message:"contact not found"});
    }
    if (contact.user_id.toString() !== req.user.id) {
        //here  we are comparing whether the user_id of the targetted contact is same as the request id 
        res.status(403);
        throw new Error("you are trying to access someone else contact")
    }
    const updatedcontact = await Contact.findByIdAndUpdate(req.params.id,
        /*enter what we need  */req.body,{
            new:true /* it is query section */
        });

    res.json(updatedcontact);
})

//private
const getidContact=asynchandler(async(req,res)=>{
    // await is very important over here
    const contact =await Contact.findById(req.params.id);
    if(!contact){
        res.status(404);
        throw new Error("contact not found");
    }
    if (contact.user_id.toString() !== req.user.id) {
        //here  we are comparing whether the user_id of the targetted contact is same as the request id 
        res.status(403);
        throw new Error("you are trying to access someone else contact")
    }
    res.json(contact).status(200);
    // res.json(contact.user_id.toString()).status(200);
});

//private
const createContact=asynchandler(async(req,res)=>{
    // error handling for  inputs
    // while  creating the user contact we need provide the email,phone,name 
    //along with above 3 info we also have to provide accesstoken i.e jwt
    //when we are going to create contact we are going to use user_id
    console.log("The request body is: ",req.body);
    const{ name,email,phone }= req.body;
    if(!name || !email || !phone)
    {
      res.status(400);
      throw new Error("All fields are mandstory");
    }
    // if they are not empty then create constant name contact
    const contactdetails=await Contact.create({name,email,phone,user_id: req.user.id});
    //since we are using a middleware and whenever we have a request this middlware is going to decode the token and then it is going to add the req.user property
    // in the req.user property we can find the id
    res.json(contactdetails).status(201);
    // res.write("hello")
})

//private
const deleteContact=asynchandler(async(req,res)=>{
    const contact = await Contact.findById(req.params.id);
    if(!contact)
    {
        res.status(404);
        throw new Error("contact not found");
    }
    if (contact.user_id.toString() !== req.user.id) {
        //here  we are comparing whether the user_id of the targetted contact is same as the request id 
        res.status(403);
        throw new Error("you are trying to access someone else contact")
    }
    await Contact.findByIdAndRemove(req.params.id);
    res.json(contact)
})

module.exports={getContact,createContact,getidContact,updateContact,deleteContact}