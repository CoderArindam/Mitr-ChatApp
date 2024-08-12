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
      return res.status(404).send("invalid credentials");
    }
    const auth = await bcrypt.compare(password, user.password);
    if (!auth) {
      return res.status(404).send("invalid credentials");
    }

    res.cookie("token", generateToken(email, user._id), {
      maxAge,
      secure: true,
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
export { signUp, login };
