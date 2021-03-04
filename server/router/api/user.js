const express = require("express")
const router = express.Router() 
const User = require("../../models/user")

router.get("/",(req,res)=>{
    // no body 
    User.find().then((result)=>{
        res.send(JSON.stringify(result))
    }).catch((err)=>{
        console.log(err)
    })
})
router.get("/:id",(req,res)=>{
    const user_id = req.params.id 
    User.findById(user_id).then((result)=>{
        res.send(JSON.stringify(result))
    }).catch((err)=>{
        console.log(err)
    })
})

router.delete("/:id",(req,res)=>{
    const user_id = req.params.id 
    User.findById(user_id).then((userToDelete)=>{
        userToDelete.delete()
        res.send(JSON.stringify(result))
    }).catch(err=>{
        console.log(err)
    })
  
})

router.put("/:id",(req,res)=>{
    
    User.findByIdAndUpdate(req.params.id, {
        username: req.body.username,
        password: req.body.password
    }).then((result)=>{
        res.send(JSON.stringify(result))
    }).catch((err)=>{
        console.log(err)
    })
})

router.post("/",(req,res)=>{
    // accept the data 
    //validation with joi
    //errors 
    //or add to the database

    //body exists

    const newUser = new User({
        username:req.body.username,
        password:req.body.password
    })
    newUser.save().then((result)=>{
        console.log(result)
        res.send(JSON.stringify(result))
    }).catch(err=>{
        console.log(err)
        res.send(JSON.stringify({error:"Error adding this to the db"}))
    })
})

router.get("/search",(req,res)=>{
    const query = req.query.username
    User.find({username: query}).then((result)=>{
        res.send(JSON.stringify(result))    
    }).catch(err=>{
        console.log(err)
    })
})


module.exports = router