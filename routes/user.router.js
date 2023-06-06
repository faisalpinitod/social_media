const express=require("express")
const {UserModel} = require("../model/user.model")
const bcrypt=require("bcrypt")
const jwt=require("jsonwebtoken")
const {authenticate}=require("../middleware/authenticate.middleware")

const userRouter=express.Router()

userRouter.post("/register",async(req,res)=>{
    const {name,email,password,dob,bio}=req.body
    try{
        const userExist= await UserModel.findOne({email})

        if(userExist){
            return res.send("User Alerady Exist")
        }
        
        bcrypt.hash(password,5,async(err,hash)=>{
            const user=new UserModel({name,email,password:hash,dob,bio})
            await user.save()
            console.log(user)
            res.send("Registered Successfull")
        })

    }catch(err){
        console.log(err)
        res.send({"Msg":"Something went wrong"})
    }
})





userRouter.post("/login",async(req,res)=>{
    const {email,password}=req.body
    try{
        const user=await UserModel.findOne({email})
        if(!user){
            res.send("Invalid User")
        }
        const hashpass=user?.password
        bcrypt.compare(password,hashpass,(err,result)=>{
           if(result){
            const token=jwt.sign({userID:user._id},"MASAI")
            res.send({"Msg":"Login Successfull",token})
           }else{
            res.send("Wrong Crediantials")
           }  
        })

    }catch(err){
        console.log(err)
        res.send({"Msg":"Something went wrong"})
    }
})


userRouter.get("/users",async(req,res)=>{
    const query=req.query
    try{
        const user=await UserModel.find(query)
        res.send(user)   
    }catch(err){
        console.log(err)
        res.send({"Msg":"Something went wrong"})
    }
})



userRouter.get("/users/:id/friends",async(req,res)=>{
    const id=req.params.id
    try{
        const user=await UserModel.findOne({_id:id})

        res.send(user.friends)   
    }catch(err){
        console.log(err)
        res.send({"Msg":"Something went wrong"})
    }
})

userRouter.post("/users/:id/friends",authenticate,async(req,res)=>{
    const id=req.params.id
    const data=req.body
    const friendsid=data.friendid
    try{
        const user=await UserModel.findById(id)
     
        const friend=await UserModel.findById(friendsid)

        if(!user || !friend){
            res.send("Invalid user")
        }
        if(user.friends.includes(friendsid)){
            return res.send("Already friend")
        }
        user.friendRequests.push(friendsid)
        await user.save()
        res.send("The friend request is send")   
    }catch(err){
        console.log(err)
        res.send({"Msg":"Something went wrong"})
    }
})


userRouter.put("/users/:id/friends/:friendid",authenticate,async(req,res)=>{
    const userid=req.params.id
    const friendid=req.params.friendid
    const accept=req.body.accept
    const data=req.body
    try{


        const user=await UserModel.findById(userid)
        
        const friend=await UserModel.findById(friendid)

        if(!user || !friend){
            res.send("Invalid user")
        }
        user.friendRequests.pull(friendid)

       
        if(accept){
            user.friends.push(friendid)
            friend.friends.push(userid)
            await friend.save()
        }
        await user.save()
        res.send("The status of friend request is "+accept)   
    }catch(err){
        console.log(err)
        res.send({"Msg":"Something went wrong"})
    }
})


module.exports={
    userRouter
}






