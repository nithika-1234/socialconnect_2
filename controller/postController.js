import Post from "../models/post.js";
import Comment from "../models/Comments.js";
import cloudinary from "../services/cloudinary.js";
import fs from "fs";

// CREATE POST (with Cloudinary upload)
export const createPost = async (req, res) => {
    try {
        const { caption, location } = req.body;
        const media = [];

        for (const file of req.files) {

            // Upload file to Cloudinary
            const result = await cloudinary.uploader.upload(file.path, {
                folder: "socialconnectfolder"
            });

            // Push media details
            media.push({
                mediaType: file.mimetype.startsWith("image") ? "image" : "video",
                mediaUrl: result.secure_url,
                publicId:result.public_id
            });

            // Delete file from local uploads folder
          await  fs.unlinkSync(file.path);
        }

        const userId = req.user.id;

        const newPost = await Post.create({
            caption,
            location,
            media,
            userId
        });

        res.status(201).json({
            success: true,
            message: "Post Created",
            data: newPost
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Error in Creating Post"
        });
    }
};


// GET ALL POSTS
export const getAllPosts = async (req, res) => {
    try {

       //Math.max(value,1)
       const page =Math.max(Number(req.query.page)||1,1)   /// first 1 is default  value and second 1 is minimum value  of page number

       const limit=Math.min(Number(req.query.limit)|| 5,20);

       const skip=(page-1)*limit;






        const posts = await Post.find()
            .populate("userId", "name profilePicture")
              .sort({createdAt:-1})
            .skip(skip)
            .limit(limit)
          



         const totalposts =await Post.countDocuments();
          const totalpages=Math.ceil(totalposts/limit);









        res.status(200).json({
            success: true,
            message: "All Posts",
            data: posts,
            paginatedData:{
                currentPage:page,
                totalpages:totalpages,
                totalPosts:totalposts,
                hasNextpage:page < totalpages,
                hasPrevPage:page>1

            }
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Error in Fetching Posts"
        });
    }
};


// GET LOGGED-IN USER POSTS
export const getUserPosts = async (req, res) => {
    try {
        const posts = await Post.find({ userId: req.user.id })
            .populate("userId", "name profilePicture")
            .sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            message: "User Posts",
            data: posts
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Error in Fetching User Posts"
        });

    }
};




export const likePost = async (req, res) => {
  try {
    const postId = req.params.id;
    const userId = req.user.id;

    const post = await Post.findById(postId);

    if (!post) {
      return res.status(404).json({
        success: false,
        message: "Post not found"
      });
    }

    const isLiked = post.likes.includes(userId);

    if (isLiked) {
      // UNLIKE
      post.likes = post.likes.filter(
        (id) => id.toString() !== userId
      );
    } else {
      // LIKE
      post.likes.push(userId);
    }

    await post.save();

    // ✅ send FULL likes array
    res.status(200).json({
      success: true,
      likes: post.likes
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Error in liking post"
    });
  }
};




export const deletePost=async(req,res)=>{

    try{

      const postId=req.params.id;

      const userId=req.user.id;
      const mypost=await Post.findById(postId);

      if(!mypost)
      {

        return res.status(404).json({success:false,message:"post not found"})
      }
      if(mypost.userId.toString()!==userId)
      {
        return res.status(403).json({success:false,message:"unauthorized "})
      }
//delete my images from cloudinary

        for( const media of mypost.media)
      {
                await cloudinary.uploader.destroy(media.publicId)
                

    
      }
      const del=await Post.findByIdAndDelete(postId);




      res.status(200).json({
        message:"data deleted successfully",
        success:true

      })


    }
    catch(error){


        console.log(error)
        res.status(500).json({

            message:"internal server error",
            success:false
    })
    }
}