import jwt, { decode } from "jsonwebtoken";

export const protect = (req,res,next)=>{
    try{
        const token = req.cookies.token;

        if(!token){
            return res.status(401).json({
                success: false,
                message: "Not Authenticated",
            });
        }

        const decoded = jwt.verify(token,process.env.JWT_SECRET);

        req.userId = decoded.userId;
        next();
    }
    catch(error){
        return res.status(401).json({
          success: false,
          message: "Invalid or expired token",
        });

    }
}