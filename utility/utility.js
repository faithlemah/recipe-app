import  jwt  from "jsonwebtoken";

 export const generateToken = (id) => {
    return jwt.sign({id}, "eyJhbGciOiJIUzI1NiJ9.eyJSb2xlIjoiQWRtaW4iLCJJc3N1ZXIiOiJJc3N1ZXIiLCJVc2VybmFtZSI6IkphdmFJblVzZSIsImV4cCI6MTY2MzE1ODE5MiwiaWF0IjoxNjYzMTU4MTkyfQ.NCwnWJuqNQx8LrqM77vf77fYmIvhx9Tomu3y1NsHUw0", {
        expiresIn: '30d'
    })
 }