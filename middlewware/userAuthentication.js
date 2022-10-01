import  jwt  from "jsonwebtoken";
import {user} from "../Models/userModel.js";

export const verifyToken = async (req, res, next) => {
    let token;
    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith("Bearer ")
    ) {
        try {
            token = req.headers.authorization.split(" ")[1];
            const decoded = jwt.verify(token, process.env.JWT_PASSKEY);
            req.user = await user.findById(decoded.id).select("-password");
            next();
        } catch (error) {
            console.error(error.message);
        }
    }

    if (!token) {
        res.status(401);
        throw new Error(`Authorization denied!`)
    }
};

//admin privileges to create, delete and update a recipe and user profile. 
export const adminStatus = async (req, res, next) => {
    if  (req.user && req.user.isAdmin) {
        next()
    } else {
        res.status(401);
        throw new Error('Not Authorized');
    }
};
// if role === professional, this user has the ability to create a recipe.
export const profStatus = async(req,res,next)=>{
    if (req,user && req.user.role === "professional"){
        next()
    }else{
        res.status(401);
        throw new Error('Not Authorized');
    }
};