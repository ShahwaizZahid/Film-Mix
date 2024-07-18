import mongoose from "mongoose";

export const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL!);

    const connection = mongoose.connection;

    connection.on("connected", () => {
      console.log("Mongo Db connected successfully");
    });

    connection.on("error", (err) => {
      console.log("Mongo Db connected error make sure mongo is running", err);
      process.exit();
    });
  } catch (e) {
    console.log("Some thing went wrong to connect DB");
    console.log(e);
  }
};
