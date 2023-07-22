const express = require("express");
const path=require("path")
const router = express.Router();

const {loginuser ,registeruser ,currentuser, loginform, signupform} =require("../controllers/user");
// const validationtoken = require("../middleware/validatetoken");
const { cookieauthorization } = require("../middleware/cookieauth");
router.post("/register",registeruser).get("/register",signupform);

router.post("/login",loginuser).get("/login",loginform);

router.get("/logout", cookieauthorization, (req, res) => {
    return res
      .clearCookie("accesstoken")
      .status(200)
      .sendFile(path.join(__dirname,"../views/homepage.html"));;
  });

router.get("/current", cookieauthorization ,currentuser);

module.exports = router;