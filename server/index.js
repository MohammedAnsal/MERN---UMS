import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import user_route from "./routes/user_route.js";
import auth_route from "./routes/auth_route.js";
import cookieParser from "cookie-parser";

dotenv.config();  //  env

mongoose.connect(process.env.MONGO_URL)
  
  .then(() => {
    console.log("Connected");
  }).
  catch(() => { console.log('Failed');
   });  //  MongoDB Connection

const app = express();

app.use(express.json())

app.use(cookieParser())

app.use('/api/user', user_route); //  user_controller
app.use('/api/auth', auth_route); //  auth_controller

app.use((err, req, res, next) => {
  
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal Server Error';
  return res.status(statusCode).json({

    success: false,
    message,
    statusCode

  });

}); //  Error Handler Middleware

const PORT = process.env.PORT || 5005

app.listen(PORT, () => { console.log(`Server Running http://localhost:${PORT}`) });