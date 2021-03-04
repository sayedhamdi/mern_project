const express = require("express")
const app = express()

const uri = "mongodb+srv://userdb:1234@cluster0.8o1xo.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"
const cors = require('cors')
const morgan = require("morgan")

const mongoose = require("mongoose");
const Blog = require("./models/blog");

app.use(express.json())
app.use(express.urlencoded())
app.use(cors())
app.use(morgan('tiny'));



mongoose.connect(uri,{ useNewUrlParser: true, useUnifiedTopology: true }).then(()=>{
    console.log("connected")
    app.listen(port,()=>{
        console.log(`server is running on port ${port}`)
    })
}).catch((err)=>{
    console.log("error while connecting to db..")
})

app.use("/api/users",require("./router/api/user"));
app.use("/api/blogs",require("./router/api/blog"))
app.use("/api/auth",require("./router/api/auth"))




app.get("/blogs",(req,res)=>{
    Blog.find().then((blogs)=>{
        res.send(JSON.stringify(blogs))
    }).catch((err)=>{
        console.log(err)
    })
})


const port = 5000 || process.env.PORT
