import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import mongoose from "mongoose";
import express from "express";
import authRouter from "./routes/auth.routes";
import coursesRouter from "./routes/courses.routes";
import courseProgressRouter from "./routes/course-progress.routes";
import { errorHandler } from "./middlewares/error.middleware";
import cors from "cors";
import path from "path";
import Progress from "./models/progress.model";
import TestAnswer from "./models/testAnswer.model";
dotenv.config();

const PORT = process.env.PORT ?? 3000;
const MONGO_URL = process.env.MONGO_URL ?? "";
console.log(MONGO_URL);

const app = express();

app.use(
  cors({
    origin: true,
    credentials: true,
  }),
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/api", authRouter);
app.use("/api", coursesRouter);
app.use("/rrr", courseProgressRouter);
app.use("/uploads", express.static(path.join(process.cwd(), "uploads")));

app.use(errorHandler);

console.log(Progress);
console.log(TestAnswer);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);

  mongoose
    .connect(MONGO_URL)
    .then(() => console.log("MongoDB connected"))
    .catch((err) => console.error("MongoDB connection error:", err));
});
