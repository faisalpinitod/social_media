
const jwt=require("jsonwebtoken")

const authenticate=(req,res,next)=>{
    const token=req.headers.authorization
    if(!token){
        return res.status(401).send({error:"Unauthorized, Please Login"})
    }
    try{
        const decoded=jwt.verify(token,"MASAI");
        if(decoded){
             req.user={userId:decoded.userID};
            next()
        }
       
    }catch(err){
        return res.status(401).send({error:"Unauthorized error, Please Login"})
    }


}

module.exports={
    authenticate
}