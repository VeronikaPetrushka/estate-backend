import mongoose from "mongoose";
import dotenv from 'dotenv';
dotenv.config();

const DB_URI = process.env.DB_URI;

mongoose
  .connect(DB_URI)
  .then(() => {
    console.log(`Database connection successful`);
  })
  .catch((error) => {
    console.error(`Database connection error`, error);
    process.exit(1);
  });
