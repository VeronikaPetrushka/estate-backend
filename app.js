import express from "express";
import morgan from "morgan";
import cors from "cors";
import path from "path";
import "dotenv/config";

// import { fileURLToPath } from 'url';

import "./db.js";

import routes from './routes/index.js';
import { createFolderIsNotExist } from "./helpers/upload.js";

const uploadDir = path.join(process.cwd(), 'tmp');
const storeImage = path.join(process.cwd(), 'public', 'images');

const app = express();

const allowedOrigins = ["http://localhost:5173"];
const corsOptions = {
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
};
app.use(cors(corsOptions));

app.use(express.json());
app.use(morgan("tiny"));

app.use('/api', routes);

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

// app.set("views", path.join(__dirname, "views"));
// app.set("view engine", "ejs");

app.use((_, res) => {
  res.status(404).json({ message: "Route not found" });
});

// app.get('/', (req, res) => {
//   res.render("index");
// })

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
