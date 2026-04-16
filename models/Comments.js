import mongoose from "mongoose";

const CommentSchema = new mongoose.Schema({
    postId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    },
    userID:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    },
    comments:{
        type:String
    }
},{timestramps:true})

const Comments = mongoose.model("comments",CommentSchema);
export default Comments
