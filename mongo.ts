import mongoose from "mongoose";

export const connectDatabase = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://khushaalchoithramani:3dCpzg8zZaFt6QDm@stipemecluster.shnu1dc.mongodb.net/opensource-saas-db"
    );
    console.log("Connected to MongoDB.");
  } catch (error) {
    console.log(error);
  }
};
