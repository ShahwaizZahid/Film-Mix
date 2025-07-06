import mongoose from "mongoose";

// Track connection state
let isConnected = false;

export const connect = async () => {
  // If already connected, return early
  if (isConnected) {
    return;
  }

  try {
    // Optimize connection settings
    const options = {
      bufferCommands: false,
      maxPoolSize: 10, // Maintain up to 10 socket connections
      serverSelectionTimeoutMS: 5000, // Keep trying to send operations for 5 seconds
      socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
      family: 4, // Use IPv4, skip trying IPv6
    };

    await mongoose.connect(process.env.MONGO_URL!, options);

    isConnected = true;
    console.log("MongoDB connected successfully");

    // Handle connection events
    mongoose.connection.on("disconnected", () => {
      isConnected = false;
      console.log("MongoDB disconnected");
    });

    mongoose.connection.on("error", (error) => {
      isConnected = false;
      console.error("MongoDB connection error:", error);
    });
  } catch (error) {
    isConnected = false;
    console.error("Failed to connect to MongoDB:", error);
    throw error;
  }
};
