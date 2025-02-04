import dotenv from "dotenv";

dotenv.config();

import express from "express";
const app = express();
import authrouter from "./routes/auth-routes.js";
import connectTodb from "./database/connect.js";
connectTodb(process.env.mongo_url);
app.use(express.json())
app.use("/api", authrouter);
app.listen(process.env.port, () => {
  console.log("server started at " + process.env.port);
});
