const express=require("express")
const {PostModel}=require("../model/post.model")
const { authenticate }  = require("../middleware/authenticate.middleware")

const postRpouter=express.Router()

postRpouter.post("/posts",authenticate,async(req,res)=>{
    const {text,image,createdAt}=req.body
    const userid=req.user.userId
    console.log(userid)
    try{
        const post=new PostModel({user:userid,text,image,createdAt})
        await post.save()
        console.log(post)
        res.send("Post created")

    }catch(err){
        console.log(err)
        res.send({"Msg":"Something went wrong"})
    }
})



postRpouter.get("/posts",authenticate,async(req,res)=>{
    const query=req.query
    try{
        const post=await PostModel.find(query)
        res.send(post)   
    }catch(err){
        console.log(err)
        res.send({"Msg":"Something went wrong"})
    }
})




postRpouter.patch("/posts/:id",authenticate,async(req,res)=>{
    const postid=req.params.id
    const data=req.body

    try{
        const post=await PostModel.findByIdAndUpdate({_id:postid},data)
       
        console.log(post)
        res.send("Post Updated")

    }catch(err){
        console.log(err)
        res.send({"Msg":"Something went wrong"})
    }
})


postRpouter.delete("/posts/:id",authenticate,async(req,res)=>{
    const postid=req.params.id


    try{
        const post=await PostModel.findByIdAndDelete({_id:postid})
       
        console.log(post)
        res.send("Post Delete")

    }catch(err){
        console.log(err)
        res.send({"Msg":"Something went wrong"})
    }
})



postRpouter.get("/posts/:id",authenticate,async(req,res)=>{
    const postid=req.params.id
    try{
        const post=await PostModel.findOne({_id:postid})
       
        console.log(post)
        res.send(post)

    }catch(err){
        console.log(err)
        res.send({"Msg":"Something went wrong"})
    }
})



// -----------------------LIKE----------------------


postRpouter.post("/posts/:id/like",authenticate,async(req,res)=>{
    const postid=req.params.id
    const userid=req.user.userId
    
    try{
        const post=await PostModel.findOne({_id:postid})
        
        
        if(!post){
           return res.send("Invalid post")
        }
        const isliked=post.likes.includes(userid)
        if(isliked){
            return res.send("Alredy liked")
        }

        post.likes.push(userid)
        await post.save()
        res.send("Post liked")  

    }catch(err){
        console.log(err)
        res.send({"Msg":"Something went wrong"})
    }
})





postRpouter.post("/posts/:id/comment",authenticate,async(req,res)=>{
    const postid=req.params.id
    const {text}=req.body
    const userid=req.user.userId
    console.log(text)
    try{
        const post=await PostModel.findOne({_id:postid})
        console.log(post)
        if(!post){
           return res.send("Invalid post")
        }
        
        const isComment={
            user:userid,
            text
        }

        post.comments.push(isComment)

        await post.save()
        res.send("Post commented")  

    }catch(err){
        res.send(err)
        // res.send({"Msg":"Something went wrong"})
    }
})



module.exports={
    postRpouter
}