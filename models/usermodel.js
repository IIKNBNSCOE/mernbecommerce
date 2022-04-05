var mongoose=require("mongoose")
var userschema=new mongoose.Schema({
    username:
    {
        type:"string",
        required:true,
        unique:true
    },
    password:
    {
        type:"string",
        required:true
    },
    email:
    {
        type:"string",
        required:true,
        unique:true
    }
},{collection:"user"})
module.exports=mongoose.model("user",userschema)
