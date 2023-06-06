const {Schema,default:mongoose}=require("mongoose")

const postSchema=mongoose.Schema({
    user: { type: Schema.Types.ObjectId, ref: 'user' },
    text: String,
    image: String,
    createdAt: Date,
    likes: [{ type: Schema.Types.ObjectId, ref: 'user' }],
    comments: [{
      user: { type: Schema.Types.ObjectId, ref: 'user' },
      text: String,
      createdAt: Date
    }]
})


const PostModel=mongoose.model("post",postSchema)

module.exports={
    PostModel
}