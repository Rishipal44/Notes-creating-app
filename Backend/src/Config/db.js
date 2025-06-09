import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    if (!process.env.MONGO_URI) {
      console.error("MONGO_URI is not defined in environment variables.");
      process.exit(1);
    }

    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB connected successfully!");
  } catch (error) {
    console.error("Error connecting to MongoDB", error);
    process.exit(1); // Exit with failure
  }
};
