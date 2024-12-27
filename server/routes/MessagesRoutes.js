import { Router } from "express";
import { verifyToken } from "../middlewares/AuthMiddleware.js";
import { getMessages, uploadFile } from "../controllers/MesagesController.js";
import upload from "../utils/multerConfig.js"; // Import Cloudinary multer config

const messagesRoutes = Router();

// Route to fetch messages
messagesRoutes.post("/get-messages", verifyToken, getMessages);

// Route to upload files
messagesRoutes.post(
  "/upload-file",
  verifyToken,
  upload.single("file"), // Use multer configured with Cloudinary
  uploadFile
);

export default messagesRoutes;
