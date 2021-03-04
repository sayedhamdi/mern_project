const express = require("express")

const router = express.Router()
const bcrypt = require("bcrypt")
const User = require("../../models/user")

router.post("/register",(req,res)=>{
    // accept the data 
    //validation with joi
    //errors 
    //or add to the database
    const {first_name,last_name,email,password} = req.body;
    //body exists
    if(!first_name || !last_name || !email || !password){
        res.status(400).json({error:"you are missing some fields"})
    }
    User.findOne({email}).then((user)=>{
        if (user){
            res.status(400).json({error:"email already user"})
        }
    }).catch(err=>{
        res.json({error:"error 1"})
    })

    bcrypt.genSalt(10).then(salt=>{
        bcrypt.hash(password, salt).then(hashed_pwd=>{
            const newUser = new User({
		first_name:first_name,
                last_name:last_name,
                email:email,
                password:hashed_pwd
            })
            newUser.save().then(newuser =>{
                res.status(201).json({first_name,last_name,email})
            }).catch(err=>console.log("error"))
        }).catch(err=>console.log("error bcrypt"))
    }).catch(err=>console.log("brcyptt"))
})





module.exports= router
