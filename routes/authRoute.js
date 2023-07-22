import express from "express";
import {
  registerController,
  loginController,
  testController,
  forgetPasswordController,
} from "../controllers/authController.js";
import { isAdmin, requireSignin } from "../middleware/authMiddelware.js";

// router object-----------------------------
const router = express.Router();

//---------------------routing logic------------------------------
// Register a new user || POST || /api/auth/register/////////////////
router.post("/register", registerController);

// Login a user || POST || /api/auth/login/////////////////////
router.post("/login", loginController);

//forget password || POST || /api/auth/forget-password/////////////////////
router.post("/forget-password", forgetPasswordController);

//test routes
router.get("/test", requireSignin, isAdmin, testController);

//protected user routes
router.get("/user-auth", requireSignin, (req, res) => {
  res.status(200).json({ ok: true });
});

//protected routes for admin
router.get("/admin-auth", requireSignin, isAdmin, (req, res) => {
  res.status(200).json({ ok: true });
});

//export router------------------------------
export default router;
