
const express=require("express")
const router = express.Router()

const Blog = require("../../models/blog");
router.get("/blogs",(req,res)=>{
    Blog.find().then((blogs)=>{
        res.send(JSON.stringify(blogs))
    }).catch((err)=>{
        console.log(err)
    })
})
module.exports = router