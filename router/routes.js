// import express from 'express'

// import {Register,loginUser} from '../controllers/authController.js'
// const router=express.Router();

// router.post('/login',loginUser)
// router.post('/register',Register);

// export default router;


import express from "express";
import { signup,login } from "../controller/userController.js"
const router = express.Router();

router.post("/register", signup);
router.post("/login",login)

export default router;