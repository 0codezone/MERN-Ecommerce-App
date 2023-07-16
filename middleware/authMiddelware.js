import JWT from "jsonwebtoken";
import userModel from "../models/userModel.js";

//Protected route Token based
export const requireSignin = (req, res, next) => {
  try {
    const decode = JWT.verify(
      req.headers.authorization,
      process.env.JWT_SECRET
    );
    req.user = decode;
    next();
  } catch (error) {
    console.log(error);
  }
};

// ---------------------------------------------------Admin Access-----------------------------------------------------
export const isAdmin = async (req, res, next) => {
  try {
    const user = await userModel.findById(req.user._id);
    if (user.role !== 1) {
      return res.status(401).json({
        success: false,
        message: "Admin resource. Access denied Unauthorised Access",
      });
    } else {
      next();
    }
  } catch (error) {
    console.log(error);
    res.send(error.message);
  }
};
