import mongoose from "mongoose";

// Connect to MongoDB
const connectToDatabase = async () => {
  try {
    // Check if there's already an existing connection to avoid multiple connections
    if (mongoose.connections[0].readyState) {
      console.log("Using existing MongoDB connection.");
      return;
    }
    // Connect to the MongoDB database
    await mongoose.connect(process.env.MONGODB_URL!, {});
    console.log("MongoDB connected successfully.");
  } catch (error) {
    console.error("MongoDB connection error:", error);
    throw new Error("Could not connect to the database.");
  }
};

export default connectToDatabase;
