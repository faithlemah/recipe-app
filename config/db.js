import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();


export const connectDB = async() => {
    try {
        mongoose.connect("mongodb+srv://Faithlemah:12345@cluster0.zxtbzvw.mongodb.net/test")
        console.log(`Connected to MongoDB Successfully`);
    } catch (error) {
        console.error(`Error: ${error.message}`)
        process.exit(1)
    }
};