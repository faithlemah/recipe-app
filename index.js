import express from "express";
import dotenv from "dotenv";
import {connectDB} from "./config/db.js";
import userRoutes from "./node_modules/express/index.js"; 
import recipeRoutes from "./node_modules/express/index.js";
import cors from 'cors';


dotenv.config();
connectDB();

const app = express();
app.use(express.json());

const port = process.env.PORT || 2000;

app.use(cors({
    origin: '*'
}));
// routes
app.use('/user', userRoutes);
app.use('/recipe',recipeRoutes)
app.get('/', (req,res)=>{
    res.send("successful!!!")
});



app.listen(port, ()=>{
    console.log(`Bravo!! ${port}`)
});