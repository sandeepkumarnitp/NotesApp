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

const allowedOrigins = [
  "http://localhost:5173",
  "http://localhost:3000",
  "https://notes-app-five-ashy-82.vercel.app",
];

app.use(
  cors({
    origin: function (origin, callback) {
      // 1. Allow Postman / Server-to-Server requests (no origin header)
      if (!origin) return callback(null, true);

      // 2. Allow explicitly listed origins
      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      // 3. Allow ANY Vercel deployment URL (.vercel.app)
      if (origin.endsWith(".vercel.app")) {
        return callback(null, true);
      }

      return callback(new Error("CORS policy violation"));
    },
    credentials: true, // Needed for cookies
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
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
