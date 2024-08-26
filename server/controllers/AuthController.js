import User from "../models/userModel.js";
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
      secure: isProduction, // Secure flag for production only
      httpOnly: true, // Prevent client-side JS access
      sameSite: isProduction ? "None" : "Lax", // SameSite setting
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

export { signUp, login, getUserInfo, updateProfile };
