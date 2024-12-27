import { CloudinaryStorage } from "multer-storage-cloudinary";
import multer from "multer";
import cloudinary from "../utils/cloudinaryConfig.js";

// Set up Cloudinary storage
const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "chatApp/uploads", // Change to your desired folder in Cloudinary
    allowedFormats: ["jpg", "jpeg", "png", "gif", "pdf", "mp4"],
    public_id: (req, file) => `${Date.now()}-${file.originalname}`, // Unique file name
  },
});

// Configure multer with Cloudinary storage
const upload = multer({ storage });

export default upload;
