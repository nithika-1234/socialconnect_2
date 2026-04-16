import mongoose from "mongoose"
export const connectDb = async()=>{
    try {
        const conn = await mongoose.connect(process.env.Mongourl);
        console.log("Database is Connected")
    } catch (error) {
        console.log("Database is Not Connected"+error)
    }
    
}