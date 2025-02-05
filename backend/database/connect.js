import mongoose from "mongoose";

export default async function connectTodb(url) {
  try {
    let connectionDetails = await mongoose.connect(url);
    //database name  = connectionDetails.connection.name
    console.log("successfully connected to the database");
  } catch (error) {
    console.log("error while connecting to the database");
  }
}
