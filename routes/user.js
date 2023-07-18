const express = require("express");

const router = express.Router();

const {loginuser ,registeruser ,currentuser} =require("../controllers/user");
const validationtoken = require("../middleware/validatetoken");
router.post("/register",registeruser);

router.post("/login",loginuser);

router.get("/current", validationtoken ,currentuser);

module.exports = router;