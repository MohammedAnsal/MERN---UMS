import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import user_route from "./routes/user_route.js";

dotenv.config();

const app = express();

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log("MongoDB Connected");
  })
  .catch(() => {
    console.log("MongoDB Connection Failed");
  });

app.use('/', user_route);

app.listen(5005, () => {
  console.log("Server Running");
});
