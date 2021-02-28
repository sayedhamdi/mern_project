const app = require("express")()

const uri = "mongodb+srv://userdb:1234@cluster0.8o1xo.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"
const bodyParser = require("body-parser");
const cors = require('cors')
const morgan = require("morgan")
const User = require("./models/user")

const mongoose = require("mongoose");
const Blog = require("./models/blog");


app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors())
app.use(morgan('tiny'));

//our model


mongoose.connect(uri,{ useNewUrlParser: true, useUnifiedTopology: true }).then(()=>{
    console.log("connected")
    app.listen(port,()=>{
        console.log(`server is running on port ${port}`)
    })
}).catch((err)=>{
    console.log("error while connecting to db..")
})

app.get("/users",(req,res)=>{
    // no body 
    User.find().then((result)=>{
        res.send(JSON.stringify(result))
    }).catch((err)=>{
        console.log(err)
    })
})

app.get("/users/:id",(req,res)=>{
    const user_id = req.params.id 
    User.findById(user_id).then((result)=>{
        res.send(JSON.stringify(result))
    }).catch((err)=>{
        console.log(err)
    })
})

app.delete("/users/:id",(req,res)=>{
    const user_id = req.params.id 
    User.findById(user_id).then((userToDelete)=>{
        userToDelete.delete()
        res.send(JSON.stringify(result))
    }).catch(err=>{
        console.log(err)
    })
  
})

app.put("/users/:id",(req,res)=>{
    
    User.findByIdAndUpdate(req.params.id, {
        username: req.body.username,
        password: req.body.password
    }).then((result)=>{
        res.send(JSON.stringify(result))
    }).catch((err)=>{
        console.log(err)
    })
})

app.post("/users",(req,res)=>{
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
app.get("/search",(req,res)=>{
    const query = req.query.username
    User.find({username: query}).then((result)=>{
        res.send(JSON.stringify(result))    
    }).catch(err=>{
        console.log(err)
    })
})
app.get("/blogs",(req,res)=>{
    Blog.find().then((blogs)=>{
        res.send(JSON.stringify(blogs))
    }).catch((err)=>{
        console.log(err)
    })
})


const port = 4000 || process.env.PORT
