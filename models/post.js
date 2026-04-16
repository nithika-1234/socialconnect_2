import mongoose from "mongoose";
const PostSchema = new mongoose.Schema({
    media: [                            // storinhg mulitple objects
        {
            mediaType:{
                type:String,
            },
            mediaUrl:{
                type:String
            },
            publicId:{

                type:String
            }
        }
    ],
    caption: {
        type: String,
        required: true
    },

    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
     likes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    }
  ],
    // likeCount:{
    //     type:Number,
    //     default:0
    // },
    commentsCount:{
        type:Number,
        default:0
    },
    location:{
        type:String
    }

}, { timestamps: true });

const Post =mongoose.model("Post", PostSchema);
export default Post;

//['fg','ghb'] = [string]
//[{mediaType:'fg',mediaURl:'ghb'}}]=[{mediaType:String,mediaURl:String}]