import  jwt  from "jsonwebtoken";

 export const generateToken = (id) => {
    return jwt.sign({id}, process.env.JWT_PASSKEY, {
        expiresIn: '30d'
    })
 }