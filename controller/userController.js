import  User  from "../models/User.js";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import "dotenv/config"
import sendEmail from "../services/emailSet.js";
export const signup = async(req,res)=>{
    try {
        const{name,email,phone,password}=req.body
        if(!name||!email||!phone||!password)
        {
            return res.status(400).json({success:false,message:"All Fields Required"})
        }
        const ExistingUser = await User.findOne({email:email});
        if(ExistingUser)
        {
            return res.status(400).json({success:false,message:"User Exists"})
        }
        const hashPassword = await bcrypt.hash(password,10)
        const newUser = await User.create({name,email,phone,password:hashPassword});
        
         await sendEmail(
  email,
  "Welcome to SocialConnect 🎉",
  `
  <div style="font-family: Arial, sans-serif; background-color: #f4f6f8; padding: 20px;">
    
    <div style="max-width: 500px; margin: auto; background: #ffffff; border-radius: 10px; padding: 25px; box-shadow: 0 4px 10px rgba(0,0,0,0.1);">
      
      <h2 style="color: #4e944f; text-align: center;">Welcome to SocialConnect 🚀</h2>
      
      <p style="font-size: 16px; color: #333;">
        Hi <strong>${name}</strong>,
      </p>
      
      <p style="font-size: 15px; color: #555;">
        We're excited to have you onboard! 🎉  
        SocialConnect helps you connect, share, and grow your network effortlessly.
      </p>
      
      <div style="text-align: center; margin: 25px 0;">
        <a href="#" 
           style="background-color: #4e944f; color: #fff; padding: 12px 20px; text-decoration: none; border-radius: 6px; font-weight: bold;">
          Get Started
        </a>
      </div>
      
      <p style="font-size: 14px; color: #777;">
        If you have any questions, feel free to reply to this email. We're here to help!
      </p>
      
      <hr style="margin: 20px 0;" />
      
      <p style="font-size: 12px; color: #aaa; text-align: center;">
        © 2026 SocialConnect. All rights reserved.
      </p>
    
    </div>
  
  </div>
  `);

        res.status(201).json({success:true,message:"Created",data:newUser})
    } catch (error) {
        console.log(error)
        res.status(400).json({success:false,message:"Register"+error})
    }
}

export const login = async(req,res)=>{
    try {
        const {email,password}= req.body;
        if(!email||!password)
        {
            return res.status(400).json({success:false,message:"All Fields Required"})
        }
        const ExistingUser = await User.findOne({email:email});
        if(!ExistingUser)
        {
            return res.status(400).json({success:false,message:"User Not Exists"})
        }
        const checkPass = await bcrypt.compare(password,ExistingUser.password);
        if(!checkPass)
        {
            return res.status(400).json({success:false,message:"Invalid Password"})
        }
        const token = await jwt.sign({id:ExistingUser._id,name:ExistingUser.name},process.env.SECRET_KEY,{expiresIn:"7d"})
        res.cookie("mycookie",token,{httpOnly:true,secure:false,samesite:'lax',maxAge:7*24*60*60*1000})
        res.status(200).json({success:true,message:"SucessFully Logged In"})
    } catch (error) {
        console.log(error)
        res.status(400).json({success:false,message:"Login"+error})
    }
}