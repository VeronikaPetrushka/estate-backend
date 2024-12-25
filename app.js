import express from "express";
import morgan from "morgan";
import cors from "cors";
import path from "path";
import "dotenv/config";

import "./db.js";

import routes from './routes/index.js';

const app = express();

app.use('/api', routes);

app.use(express.json());
app.use(cors());
app.use(morgan("tiny"));

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
    console.log(`Server running on port ${PORT}`);
  });
} catch (err) {
  console.error(`Server not running. Error message: ${err.message}`);
}

export default app;
