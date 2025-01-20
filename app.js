import express from "express";
import morgan from "morgan";
import cors from "cors";
import path from "path";
import "dotenv/config";

import "./db.js";

import routes from './routes/index.js';
import { createFolderIsNotExist } from "./helpers/upload.js";

const uploadDir = path.join(process.cwd(), 'tmp');
const storeImage = path.join(process.cwd(), 'public', 'images');

const app = express();

const allowedOrigins = [
  "http://localhost:5173",
  "https://south-estate-web-front.vercel.app"
];

app.use(cors({
  origin: (origin, callback) => {
    if (allowedOrigins.includes(origin) || !origin) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
  methods: "GET, POST, PUT, DELETE, OPTIONS",
  allowedHeaders: "Content-Type, Authorization",
}));


app.use(express.json());
app.use(morgan("tiny"));

app.use('/api', routes);

app.use((_, res) => {
  res.status(404).json({ message: "Route not found" });
});

app.use((err, req, res, next) => {
  const { status = 500, message = "Server error" } = err;
  res.status(status).json({ message });
});

const PORT = process.env.PORT || 8080;

try {
  app.listen(PORT, () => {
    createFolderIsNotExist(uploadDir);
    createFolderIsNotExist(storeImage);
    console.log(`Server running on port ${PORT}`);
  });
} catch (err) {
  console.error(`Server not running. Error message: ${err.message}`);
}

export default app;
