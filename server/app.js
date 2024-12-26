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

app.use(
  cors({
    // origin: [process.env.ORIGIN],
    origin: "*",
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    credentials: true,
  })
);

app.use("/uploads/profiles", express.static("uploads/profiles"));
app.use("/uploads/files", express.static("uploads/files"));

app.use(cookieParser());
app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api/contacts", contactRoutes);
app.use("/api/messages", messagesRoutes);

const server = app.listen(port, () => {
  console.log("server is running" + port);
});

setupSocket(server);
