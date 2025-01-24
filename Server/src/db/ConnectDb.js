import mongoose from "mongoose";
import { DB_NAME } from "../constant";


export const connectDb = async () => {
    try {
        const connection =  await mongoose.connect(`process.env.MONGODB_URL/${DB_NAME}`);
        console.log("Database connected");
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
};