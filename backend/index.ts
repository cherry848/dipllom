import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import mongoose from "mongoose";
import express from "express";
import authRouter from "./routes/auth.routes";
import { errorHandler } from "./middlewares/error.middleware";
import cors from "cors";

dotenv.config();

const PORT = process.env.PORT ?? 3000;
const MONGO_URL = process.env.MONGO_URL ?? "";

const app = express();

app.use(
  cors({
    origin: true,
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/api", authRouter);
app.use("/uploads", express.static("uploads"))

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);

  mongoose
    .connect(MONGO_URL)
    .then(() => console.log("MongoDB connected"))
    .catch((err) => console.error("MongoDB connection error:", err));
});
