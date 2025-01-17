import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import connectDb from "./config/connectDb.js";
import authRoutes from "./routes/AuthRoutes.js";
import { contactRoutes } from "./routes/ContactRoutes.js";
import messagesRoutes from "./routes/MessagesRoutes.js";
import setupSocket from "./socket.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 3001;
const db_url = process.env.DATABASE_URL;

connectDb(db_url);

// CORS configuration
app.use(
  cors({
    origin: ["https://mitr-chat.vercel.app"],
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    credentials: true,
  })
);

// Static file serving removed, as you are now using Cloudinary for uploads
// app.use("/uploads/profiles", express.static("uploads/profiles"));
// app.use("/uploads/files", express.static("uploads/files"));

// Middleware for parsing cookies and JSON bodies
app.use(cookieParser());
app.use(express.json());

// Route handling
app.use("/api/auth", authRoutes);
app.use("/api/contacts", contactRoutes);
app.use("/api/messages", messagesRoutes);

// Start server
const server = app.listen(port, () => {
  console.log("server is running on port " + port);
});

// Set up socket.io if needed
setupSocket(server);
