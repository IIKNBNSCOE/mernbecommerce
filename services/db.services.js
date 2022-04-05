
var mongoose=require("mongoose");
var connectToDB=(url)=>{
mongoose.connect(url,()=>{
    console.log("Mongo DB Connected");
})
}
module.exports={connectToDB};