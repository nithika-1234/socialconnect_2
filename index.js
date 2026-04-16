import express from "express"
import dotenv from "dotenv"
dotenv.config();
import cors from "cors"
import cookieParser from "cookie-parser"
import { connectDb } from "./connection/mongooseConnect.js";
import router from "./router/routes.js";
import PostRouter from "./router/postRoute.js";

const app = express();




app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin:['http://localhost:5173','http://localhost:5174'],//which frontend have to access the backend
    credentials:true
}));
app.use("/uploads", express.static("uploads"));
app.use("/auth",router);
app.use("/post",PostRouter);
const PORT = process.env.PORT;
app.listen(PORT,()=>{
    connectDb();
    console.log(`Server is running in http://localhost:${process.env.PORT}`)
})
