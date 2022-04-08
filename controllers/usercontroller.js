var usermodel=require("../models/usermodel")
const nodemailer = require('nodemailer');
var env=require("dotenv");
const { getMaxListeners } = require("../models/usermodel");
env.config()
var sendmail=(req,res,doc,esubject,etext)=>
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
            to: doc.email,
            subject: esubject,
            text: etext
       }
       transporter.sendMail(message, (err, info)=> {
            if (err) {
                console.log(process.env.EMAILID);
                console.log(process.env.PASSWORD);
              console.log(err)
            } else {
              console.log(req.body.email);
             
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
            var subject="Notification for Ecommerce application registration"
            var text=`Dear user ${doc.username} your account has been created with username=${doc.username} and password=${doc.password}`
            sendmail(req,res,doc,subject,doc);
            res.send({message:"Registration is successful"})
           // res.send({message:"record inserted"});
            
            
        }
    });
}
var fpass=(req,res)=>
{
    
    usermodel.findOne({email:req.body.email},(err,doc)=>
    {
        if(err)
        {
            res.send({message:"Server Error.. Please try after some time"})
        }
        else{
            if(!doc)
            {
                res.send({message:`User does not exists with Email ID `})
            }
            else
            {
               console.log(doc);
               //res.send(doc.username);
              var subject="Regarding password for your account"
               var text=`Dear user ${doc.username} , password of your account is  ${doc.password}`
               //res.send({message:"Valid User"});
               sendmail(req,res,doc,subject,text);
               res.send({message:`Password has been sent to ${doc.email} `});
           
            }
        }
    })
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
           res.send({message:"Valid User"});
          //res.send(doc);
           else
           res.send({message:"Invalid User, Password dont match"});
            }
        }
    })
}
module.exports={register,login,fpass}
