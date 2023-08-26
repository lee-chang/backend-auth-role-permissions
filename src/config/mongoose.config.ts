import mongoose from "mongoose";
import { ENV_CONFIG } from "./env.config";

// Connect to MongoDB using typescript

mongoose.set("strictQuery", false);


export const connect = async () => {
  try {
    const conn = await mongoose.connect(`${ENV_CONFIG.MONGODB_URI}`);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
};
