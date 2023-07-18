const express = require("express");
const router= express.Router();

const{getContact}=require("../controllers/contactcontroller");
const{updateContact}=require("../controllers/contactcontroller");
const{getidContact}=require("../controllers/contactcontroller");
const{createContact}=require("../controllers/contactcontroller");
const{deleteContact}=require("../controllers/contactcontroller");
const validationtoken = require("../middleware/validatetoken");
// to access this get method we need to use the above exports 

//here we are protecting the contacts using validation using jwt

router.get("/",validationtoken ,getContact);

router.put("/:id",validationtoken ,updateContact);

router.get("/:id",validationtoken ,getidContact);

router.post("/",validationtoken ,createContact);

//localhost:5001/contact/:id
// router.delete("/:id",(req,res)=>{
//     res.json({
//         message: `Delete the contact for ${req.params.id}`
//     })
// })

router.delete("/:id",validationtoken ,deleteContact);

module.exports=router;