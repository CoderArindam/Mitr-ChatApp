import User from "../models/UserModel.js";
import cloudinary from "../utils/cloudinaryConfig.js";
import { generateToken, maxAge } from "../utils/generateTokens.js";
import bcrypt from "bcrypt";
const signUp = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).send("Both fields are required");
    }

    const user = await User.create({ email, password });
    res.cookie("token", generateToken(email, user._id), {
      maxAge,
      secure: true,
      sameSite: "None",
    });
    return res.status(201).json({
      user: {
        id: user._id,
        email: user.email,
        profileSetup: user.profileSetup,
      },
    });
  } catch (error) {
    console.log(error.message);
    return res.status(500).send("Internal Server Error");
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).send("Both fields are required");
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).send("Invalid credentials");
    }

    const auth = await bcrypt.compare(password, user.password);
    if (!auth) {
      return res.status(404).send("Invalid credentials");
    }

    const isProduction = process.env.NODE_ENV === "production";

    res.cookie("token", generateToken(email, user._id), {
      maxAge: maxAge * 1000, // Convert to milliseconds
      secure: true,
      httpOnly: false,
      sameSite: "None",
    });

    return res.status(200).json({
      user: {
        id: user._id,
        email: user.email,
        profileSetup: user.profileSetup,
        firstName: user.firstName,
        lastName: user.lastName,
        image: user.image,
        color: user.color,
      },
    });
  } catch (error) {
    console.log(error.message);
    return res.status(500).send("Internal Server Error");
  }
};

const getUserInfo = async (req, res, next) => {
  try {
    const userData = await User.findById(req.userId);
    if (!userData) {
      return res.status(404).send("user not found with given id");
    }
    return res.status(200).json({
      id: userData._id,
      email: userData.email,
      profileSetup: userData.profileSetup,
      firstName: userData.firstName,
      lastName: userData.lastName,
      image: userData.image,
      color: userData.color,
    });
  } catch (error) {
    console.log(error.message);
    return res.status(500).send("Internal Server Error");
  }
};

const updateProfile = async (req, res, next) => {
  try {
    const { userId } = req;
    const { firstName, lastName, selectedColor } = req.body;

    if (!firstName || !lastName || !selectedColor) {
      return res.status(400).send("all details are required");
    }

    const userData = await User.findByIdAndUpdate(
      userId,
      {
        firstName,
        lastName,
        color: selectedColor,
        profileSetup: true,
      },
      { new: true, runValidators: true }
    );
    return res.status(200).json({
      id: userData._id,
      email: userData.email,
      profileSetup: userData.profileSetup,
      firstName: userData.firstName,
      lastName: userData.lastName,
      image: userData.image,
      color: userData.color,
    });
  } catch (error) {
    console.log(error.message);
    return res.status(500).send("Internal Server Error");
  }
};

// const addProfileImage = async (req, res, next) => {
//   try {
//     if (!req.file) {
//       return res.status(400).send("file is required");
//     }
//     const date = Date.now();
//     console.log(req.file);

//     let fileName = "uploads/profiles/" + date + req.file.originalname;
//     renameSync(req.file.path, fileName);

//     const updatedUser = await User.findByIdAndUpdate(
//       req.userId,
//       { image: fileName },
//       { new: true, runValidators: true }
//     );

//     return res.status(200).json({
//       image: updatedUser.image,
//     });
//   } catch (error) {
//     console.log(error.message);
//     return res.status(500).send("Internal Server Error");
//   }
// };

// const removeProfileImage = async (req, res, next) => {
//   try {
//     const { userId } = req;
//     const user = await User.findById(userId);
//     if (!user) {
//       return res.status(404).send("user not found");
//     }

//     if (user.image) {
//       unlinkSync(user.image);
//     }
//     user.image = null;
//     await user.save();

//     return res.status(200).send("profile image removed successfully!");
//   } catch (error) {
//     console.log(error.message);
//     return res.status(500).send("Internal Server Error");
//   }
// };

const addProfileImage = async (req, res, next) => {
  try {
    if (!req.file) {
      return res.status(400).send("File is required");
    }

    // Cloudinary image URL
    const imageUrl = req.file.path; // Cloudinary provides this URL after uploading the image

    // Update the user model with the Cloudinary image URL
    const updatedUser = await User.findByIdAndUpdate(
      req.userId, // Assuming you get userId from the JWT payload
      { image: imageUrl },
      { new: true, runValidators: true }
    );

    return res.status(200).json({
      image: updatedUser.image, // Return the Cloudinary image URL
    });
  } catch (error) {
    console.log(error.message);
    return res.status(500).send("Internal Server Error");
  }
};

const removeProfileImage = async (req, res, next) => {
  try {
    const { userId } = req;

    // Find user by ID
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).send("User not found");
    }

    if (user.image) {
      // Extract public ID from the Cloudinary URL
      const publicId = user.image.split("/").pop().split(".")[0]; // Assuming the URL has the pattern `https://res.cloudinary.com/<cloud-name>/image/upload/<public-id>`

      // Delete the image from Cloudinary
      await cloudinary.uploader.destroy(publicId);

      // Remove the image from the user's profile
      user.image = null;
      await user.save();
    }

    return res.status(200).send("Profile image removed successfully!");
  } catch (error) {
    console.log(error.message);
    return res.status(500).send("Internal Server Error");
  }
};

const logout = async (req, res, next) => {
  try {
    res.cookie("token", "", { maxAge: 1, secure: true, sameSite: "None" });
    res.status(200).send("Logged out successfull");
  } catch (error) {
    console.log(error.message);
    return res.status(500).send("Internal Server Error");
  }
};

export {
  signUp,
  login,
  logout,
  getUserInfo,
  updateProfile,
  addProfileImage,
  removeProfileImage,
};
