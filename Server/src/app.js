import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();
app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
);
app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));
app.use(cookieParser());

//Routes
import userRoutes from "./routes/user.routes.js";
import Comment from "./routes/Comment.routes.js";
import Follow from "./routes/Follow.routes.js";
import Like from "./routes/Like.routes.js";
import UserData from "./routes/UserData.routes.js";
import verified from "./routes/Verified.routes.js";
import views from "./routes/views.routes.js";

app.use("/api/v1/user", userRoutes);
app.use("/api/v1/comment", Comment);
app.use("/api/v1/follow", Follow);
app.use("/api/v1/like", Like);
app.use("/api/v1/userdata", UserData);
app.use("/api/v1/verified", verified);
app.use("/api/v1/views", views);
export { app };
