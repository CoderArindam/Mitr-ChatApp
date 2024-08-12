import mongoose from "mongoose";

const connectDb = async (db_url) => {
  try {
    await mongoose.connect(db_url);
    console.log("Database connected successfully");
  } catch (error) {
    console.error("Database connection failed:", error);
    process.exit(1); // Exit the process with failure
  }
};

export default connectDb;
