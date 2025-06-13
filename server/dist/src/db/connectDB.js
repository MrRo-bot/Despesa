import mongoose from "mongoose";
export const connectDB = async () => {
    // mongoose for connecting Node.js to mongodb server easily
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI || "");
        console.log(`MongoDB connected: ${conn.connection.host}`);
    }
    catch (error) {
        console.error(`Error: ${error.message}`);
        throw new Error(error.message || `Database Error`);
    }
};
