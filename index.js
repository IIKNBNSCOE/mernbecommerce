var express=require("express");
var app=express();
var env=require("dotenv");
var dbservice=require("./services/db.services")
var router=require("./routes/userroute")
var mongoose=require("mongoose")
//app.get("")
env.config()
dbservice.connectToDB(process.env.MONGODB_URL)
app.use(express.json())
app.use("/",router)
app.listen(process.env.PORT,()=>{
    console.log("server started");
})