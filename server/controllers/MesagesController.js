import Message from "../models/MessagesModel.js";
import { mkdirSync, renameSync } from "fs";
import cloudinary from "../utils/cloudinaryConfig.js";
const getMessages = async (req, res, next) => {
  try {
    const user1 = req.userId;
    const user2 = req.body.id;
    if (!user1 || !user2) {
      return res.status(400).send("both user ids are required");
    }

    const messages = await Message.find({
      $or: [
        {
          sender: user1,
          recipient: user2,
        },
        { sender: user2, recipient: user1 },
      ],
    }).sort({ timesStamp: 1 });

    return res.status(200).json({ messages });
  } catch (error) {
    console.log(error.message);
    return res.status(500).send("Internal Server Error");
  }
};

// const uploadFile = async (req, res, next) => {
//   try {
//     if (!req.file) {
//       return res.status(400).send("File is required");
//     }
//     const date = Date.now();
//     let fileDir = `uploads/files/${date}`;
//     let fileName = `${fileDir}/${req.file.originalname}`;
//     mkdirSync(fileDir, { recursive: true });
//     renameSync(req.file.path, fileName);
//     return res.status(200).json({ filePath: fileName });
//   } catch (error) {
//     console.log(error.message);
//     return res.status(500).send("Internal Server Error");
//   }
// };

const uploadFile = async (req, res, next) => {
  try {
    if (!req.file) {
      return res.status(400).send("File is required");
    }

    // Upload file to Cloudinary
    const result = await cloudinary.uploader.upload(req.file.path, {
      folder: "chatApp/uploads", // Specify the folder in Cloudinary
      public_id: `${Date.now()}-${req.file.originalname}`, // Unique file identifier
    });

    // Return the Cloudinary URL
    return res.status(200).json({ filePath: result.secure_url });
  } catch (error) {
    console.error("Cloudinary Upload Error:", error.message);
    return res.status(500).send("Internal Server Error");
  }
};

export default uploadFile;

export { getMessages, uploadFile };
