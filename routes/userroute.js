var express=require("express");
var router=express.Router()
var controller=require("../controllers/usercontroller")
router.post("/register",controller.register)
router.post("/login",controller.login)
router.post("/fpass",controller.fpass)

module.exports=router

