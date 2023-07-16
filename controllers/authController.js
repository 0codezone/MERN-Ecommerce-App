import userModel from "../models/userModel.js";
import { comparePassword, hashPassword } from "../helpers/authHelper.js";
import JWT from "jsonwebtoken";
import colors from "colors";

colors.enable();
// ------------------------------------------------------------------------------------------------------------
// ---------------------------------------------REGISTRATION--------------------------------------------------
export const registerController = async (req, res) => {
  try {
    const { name, email, password, phone, address } = req.body;
    //validation
    if (!name) {
      return res.send({ error: "Name is required" });
    }
    if (!email) {
      return res.send({ error: "Email is required" });
    }
    if (!password) {
      return res.send({ error: "Password is required" });
    }
    if (!phone) {
      return res.send({ error: "Phone is required" });
    }
    if (!address) {
      return res.send({ error: "Address is required" });
    }

    //check user--------
    const existingUser = await userModel.findOne({ email });
    // already exists
    if (existingUser) {
      return res
        .status(200)
        .json({ error: "Email already exists please Login" });
    }

    // -------register new user-----
    //hash password
    const hashedPassword = await hashPassword(password);

    //create new user
    const newUser = new userModel({
      name,
      email,
      password: hashedPassword,
      phone,
      address,
    });
    //save user to db
    await newUser.save();
    res.status(201).json({
      success: true,
      message: "User registration successful",
      user: newUser,
    });
  } catch (error) {
    console.log(error).bgRed.white.bold;
    res.status(500).json({
      success: false,
      message: "Server registration Error",
      error: error.message,
    });
  }
};

// ------------------------------------------------------------------------------------------------------------------
// ---------------------------------------------LOGIN POST----------------------------------------------------------------

export const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;
    //validation
    if (!email || !password) {
      return res.status(404).json({
        success: false,
        message: "invalid email or password",
      });
    }

    //check user--------
    const user = await userModel.findOne({ email });
    // already exists
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "email (user) doest not Exist please register first",
      });
    }
    // check password by comparing
    const match = await comparePassword(password, user.password);
    if (!match) {
      return res.status(200).json({
        success: false,
        message: "Invalid password",
      });
    }

    //create token
    const token = await JWT.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });
    res.status(200).json({
      success: true,
      message: "User login successful",
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        address: user.address,
      },
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Server Login Error",
      error: error.message,
    });
  }
};

// -----------------------------------------------test Contoller for testing routes-----------------------------------------
export const testController = (req, res) => {
  try {
    console.log("test protected route controller");
    res.send("test protected route controller");
  } catch (error) {
    console.log(error);
    res.json({ error: error.message });
  }
};
