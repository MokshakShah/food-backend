import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config(); // Load variables from .env

export const connectDB = async () => {
  try {
    console.log("MONGO_URI from Render ->", process.env.MONGO_URI);
    await mongoose.connect(process.env.MONGO_URI);
    console.log("DB Connected");
  } catch (error) {
    console.error("DB Connection Failed:", error);
  }
};
