const {Schema,default:mongoose}=require("mongoose")

const userSchema=mongoose.Schema({
    name: String,
    email: String,
    password: String,
    dob: Date,
    bio: String,
    posts: [{ type: Schema.Types.ObjectId, ref: 'post' }],
    friends: [{ type: Schema.Types.ObjectId, ref: 'user' }],
    friendRequests: [{ type: Schema.Types.ObjectId, ref: 'user' }]
})


const UserModel=mongoose.model("user",userSchema)

module.exports={
    UserModel
}