import mongoose from "mongoose";

export const databaseConnection = async () => {
  try {
    const MONGODB_URL = process.env.MONGODB_URL;
    const response = await mongoose.connect(MONGODB_URL);
    console.log("Database Connected Successfully: ", response.connection.name);
  } catch (err) {
    console.log("Database error: ", err);
  }
};
