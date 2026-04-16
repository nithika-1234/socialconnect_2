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
    origin:true,//which frontend have to access the backend
    credentials:true
}));
app.use("/uploads", express.static("uploads"));
app.use("/auth",router);
app.use("/post",PostRouter);
app.get("/test",(req,res)=>{
    res.send("Hello its me")
});
const PORT = process.env.PORT || 5000;
connectDb()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.log("DB connection failed:", err);
  });
