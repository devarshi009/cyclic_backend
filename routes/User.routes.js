const express=require("express")
const {UserModel}=require("../model/User.model")
const bcrypt = require('bcrypt');
const userRouter=express.Router()
const jwt=require("jsonwebtoken")
userRouter.post("/register",async(req,res)=>{
    // const payload=(req.body)
    const {name,email,pass}=req.body
    try{
        bcrypt.hash(pass, 5, async(err, hash)=> {
            if(err) res.send({"msg":"Something went wrong","error":err.message})
            // Store hash in your password DB.
            else{
                const user=new UserModel({name,email,pass:hash})
                 await user.save()
                res.send({"msg":"new user registerd"})  
            }
        });
        
    }catch(err){
        res.send({"msg":"somehing wrong!","error":err.message})
    }
   
    
})

userRouter.post("/login",async(req,res)=>{
    const {email,pass}=(req.body)
  
    try{
       
        const user=await UserModel.find({email}) 
        if(user.length>0){
            bcrypt.compare(pass, user[0].pass, (err, result)=> {
                if(result){
                    const token = jwt.sign({ userID:user[0]._id}, 'masai');
                    res.send({"msg":"Login Successfull","token":token})
                }  else{
                    res.send({"msg":" Wrong Credentials "})
               
                }
            });
           
        }else{
          res.send({"msg":"Wrong Credentials"})
        }
        
    }catch(err){
        res.send({"msg":"something fissy!","error":err.message})
    }
  
})
module.exports={userRouter}