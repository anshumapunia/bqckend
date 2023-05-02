const express = require("express");
const userRouter = express.Router();
const bcrypt = require('bcrypt');
const cors = require("cors")
const saltRounds = 5;
const jwt = require('jsonwebtoken');
const { UserModel } = require("../models/user.model");


userRouter.post("/register",(req,res)=>{
    const {name,age,email,pass} = req.body;
    try{
        
        bcrypt.hash(pass, saltRounds, async(err, hash)=> {
            // Store hash in your password DB.
            const user = new UserModel({name,age,email,pass:hash});
            await user.save();
            res.status(200).send({"msg": "New User has been Registered"});
        })
    }catch(err){
        res.status(400).send({"err": err.message});
    }

})
userRouter.post("/login",async(req,res)=>{
        const {email,pass} = req.body;
        try{
            
            const user = await UserModel.findOne({email});
            // console.log(user);
            // res.send("...work in progress...");
            if(user){
                bcrypt.compare(pass, user.pass, (err, result)=> {
                    // result == true
                    const token = jwt.sign({ authorID: user.id, author: user.name}, 'masai');
                    res.status(200).send({"msg":"login Sucessfully","token":token});
                })
            }else{
                res.status(200).send({"msg": "Wrong Credentials"})
            }
        }catch(err){
            res.status(400).send({"err": err.message});
        }
})
module.exports=
{
    userRouter
};
