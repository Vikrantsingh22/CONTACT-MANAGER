const express = require("express");

const router = express.Router();

const {loginuser ,registeruser ,currentuser, loginform, signupform} =require("../controllers/user");
// const validationtoken = require("../middleware/validatetoken");
const { cookieauthorization } = require("../middleware/cookieauth");
router.post("/register",registeruser).get("/register",signupform);

router.post("/login",loginuser).get("/login",loginform);

router.get("/current", cookieauthorization ,currentuser);

module.exports = router;