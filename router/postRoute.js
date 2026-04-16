
import express from 'express'
import { createPost, getAllPosts, getUserPosts,likePost,deletePost } from "../controller/postController.js";
import { authUser } from "../middleware/authUser.js";
import upload from "../middleware/upload.js";

const PostRouter = express.Router();

PostRouter.post("/create",authUser,upload.array("media"),createPost);
PostRouter.get("/all",getAllPosts);
PostRouter.get("/user",authUser,getUserPosts);
PostRouter.put("/like/:id", authUser, likePost);
PostRouter.delete("/delete/:id",authUser,deletePost)

export default PostRouter;