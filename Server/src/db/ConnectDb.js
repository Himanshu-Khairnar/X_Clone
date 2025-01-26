import mongoose from "mongoose";
import { DB_NAME } from "../constant.js";


 const connectDb = async () => {
    try {
        const url = process.env.MONGODB_URI
        const connection = await mongoose.connect(`${url}/${DB_NAME}`);
        console.log("Database connected");
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
};
export default connectDb;