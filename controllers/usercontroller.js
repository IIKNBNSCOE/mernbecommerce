var usermodel=require("../models/usermodel")
const nodemailer = require('nodemailer');
var env=require("dotenv");
const { getMaxListeners } = require("../models/usermodel");
env.config()
var sendmail=(req,res)=>
{
    let transporter = nodemailer.createTransport({
        host: "smtp.mailtrap.io",
        port: 2525,
        auth: {
          user: process.env.USER,
          pass: process.env.PASS
        }})
        message = {
            from: "iktechik50@gmail.com",
            to: req.body.email,
            subject: "Notification for Ecommerce application registration",
            text: `Dear user ${req.body.username}, your account has been created...`
       }
       transporter.sendMail(message, (err, info)=> {
            if (err) {
                console.log(process.env.EMAILID);
                console.log(process.env.PASSWORD);
              console.log(err)
            } else {
              console.log(req.body.email);
              res.send({message:"Registration is successful"})
            }
        })
    
}
var register=(req,res)=>
{
    console.log(req.body)
    //res.send(req.body)
    var umodel=new usermodel(req.body)
    umodel.save((err,doc)=>
    {
        if(err)
        {
            res.send({message:"Duplicate username or email... Use unique one"});
        }
        else
        {
            sendmail(req,res);
           // res.send({message:"record inserted"});
            
            
        }
    });
}
var login=(req,res)=>
{
    usermodel.findOne({username:req.body.username},(err,doc)=>
    {
        if(err)
        {
            res.send({message:"Server Error.. Please try after some time"})
        }
        else{
            if(!doc)
            {
                res.send({message:"user does not exists"})

            }
            else
            {
           if(req.body.password === doc.password)
           res.send({message:"valid user"});
          //res.send(doc);
           else
           res.send({message:"invalid user, password dont match"});
            }
        }
    })
}
module.exports={register,login}
