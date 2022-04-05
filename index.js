var express=require("express");
var app=express();
var env=require("dotenv");
var dbservice=require("./services/db.services")
var mongoose=require("mongoose")
//app.get("")
env.config()
dbservice.connectToDB(process.env.MONGODB_URL)
app.listen(process.env.PORT,()=>{
    console.log("server started");
})