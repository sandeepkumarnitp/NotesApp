import dotenv from "dotenv";
dotenv.config({ path: "./.env" });
import express from "express";
import { databaseConnection } from "./db/dbConnection.js";
import cookieParser from "cookie-parser";
import cors from "cors";

const app = express();
const PORT = process.env.PORT;

//mongodb connection
databaseConnection();

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  }),
);

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// User router
import userRouter from "./routes/user.routes.js";
app.use("/api/v1/user", userRouter);

// Notes router
import noteRouter from "./routes/note.routes.js";
app.use("/api/v1/note", noteRouter);

// Middleware
import { errorMiddleware } from "./middlewares/error.middleware.js";
app.use(errorMiddleware);

app.get("/", (req, res) => {
  res.send("Your are on root directory!");
});

app.listen(PORT, () => {
  console.log(`Server is running on PORT ${PORT}`);
});
