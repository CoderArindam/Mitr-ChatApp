import { Router } from "express";
import {
  getUserInfo,
  login,
  signUp,
  updateProfile,
  addProfileImage,
  removeProfileImage,
  logout,
} from "../controllers/AuthController.js";
import { verifyToken } from "../middlewares/AuthMiddleware.js";
import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "../utils/cloudinaryConfig.js";

// Cloudinary configuration
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Cloudinary storage configuration for multer
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "chatApp/profiles", // Customize the folder name
    allowedFormats: ["jpg", "jpeg", "png", "gif"], // Allowed file formats
    public_id: (req, file) => `${Date.now()}-${file.originalname}`, // Create unique file IDs
  },
});

const upload = multer({ storage });

const authRoutes = Router();

authRoutes.post("/signup", signUp);
authRoutes.post("/login", login);
authRoutes.get("/get-user-info", verifyToken, getUserInfo);
authRoutes.post("/update-profile", verifyToken, updateProfile);

// Use Cloudinary storage for profile image upload
authRoutes.post(
  "/add-profile-image",
  verifyToken,
  upload.single("profile-image"), // This uses the multer configured with Cloudinary
  addProfileImage
);

authRoutes.delete("/remove-profile-image", verifyToken, removeProfileImage);

authRoutes.post("/logout", logout);

export default authRoutes;
