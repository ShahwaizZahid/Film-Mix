import mongoose from "mongoose";

export const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL!);

    const connection = mongoose.connection;

    console.log("Mongo connected successfully");
  } catch (e) {
    console.log("Some thing went wrong to connect DB");
    return;
  }
};
