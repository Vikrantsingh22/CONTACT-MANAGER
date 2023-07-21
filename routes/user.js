const express = require("express");

const router = express.Router();

const {loginuser ,registeruser ,currentuser} =require("../controllers/user");
// const validationtoken = require("../middleware/validatetoken");
const { cookieauthorization } = require("../middleware/cookieauth");
router.post("/register",registeruser);

router.post("/login",loginuser);

router.get("/current", cookieauthorization ,currentuser);

module.exports = router;