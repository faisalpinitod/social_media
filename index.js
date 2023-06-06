const express=require("express")
const {connection} = require('./config/db')
const {userRouter}=require("./routes/user.router")
const { postRpouter } = require("./routes/post.router")

const app=express()

app.use(express.json())


app.get("/",(req,res)=>{
    res.send("Welcome to social media")
})

app.use("/api",userRouter)
app.use("/post",postRpouter)


app.listen(7070,async()=>{
    try{
        await connection 
        console.log("The server is connected to DB")
    }catch(err){
        console.log(err)
        console.log({"Msg":"Something went wrong"})
    }
    console.log("The server is connected to the server 6060")
})