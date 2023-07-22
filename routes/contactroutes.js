const express = require("express");
const router= express.Router();

const{getContact, updateform, searchform, createform, deleteform}=require("../controllers/contactcontroller");
const{updateContact}=require("../controllers/contactcontroller");
const{getidContact}=require("../controllers/contactcontroller");
const{createContact}=require("../controllers/contactcontroller");
const{deleteContact}=require("../controllers/contactcontroller");
// const validationtoken = require("../middleware/validatetoken");
const { cookieauthorization } = require("../middleware/cookieauth");
// to access this get method we need to use the above exports 

//here we are protecting the contacts using validation using jwt

// router.get("/",validationtoken ,getContact);
router.get("/", cookieauthorization ,getContact);

// router.put("/:id",validationtoken ,updateContact);
router.post("/update",cookieauthorization ,updateContact);
router.get("/update",cookieauthorization ,updateform);

// router.get("/:id",validationtoken ,getidContact);
router.post("/search",cookieauthorization ,getidContact);
router.get("/search",cookieauthorization ,searchform);

router.post("/create",cookieauthorization ,createContact);
router.get("/create",cookieauthorization ,createform);


//localhost:5001/contact/:id
// router.delete("/:id",(req,res)=>{
//     res.json({
//         message: `Delete the contact for ${req.params.id}`
//     })
// })

router.post("/delete",cookieauthorization ,deleteContact);
router.get("/delete",cookieauthorization ,deleteform);

module.exports=router;