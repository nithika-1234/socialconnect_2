import jwt from 'jsonwebtoken';

export const authUser = async (req,res,next) => {
    try {
        // const token = req.header("auth-token")
        const token = req.cookies.mycookie;
        if(!token)
        {
            return res.status(400).json({success:false,message:"Token Not Found"});
        }
        const decode = jwt.verify(token,process.env.SECRET_KEY); // get payload
        if(!decode)
        {
            return res.status(400).json({success:false,message:"No Token Exist"});
        }
        req.user = decode;
        next();
    } catch (error) {
        console.log("authUser:"+error.message);
        return res.status(400).json({success:false,message:"Not Authorized"});
    }
}