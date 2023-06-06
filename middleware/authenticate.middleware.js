
const jwt=require("jsonwebtoken")

const authenticate=(req,res,next)=>{
    const token=req.headers.authorization
    if(!token){
        return res.send("Please login first")
    }
    jwt.verify(token,'MASAI',(err,decode)=>{
        if(decode){
            req.user={userid:decode.userID}   

            next()
           
        }else{ 
            res.send("Please login first")
        }
    })


}

module.exports={
    authenticate
}