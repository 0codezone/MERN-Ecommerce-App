import express from "express";
import {
  registerController,
  loginController,
  testController,
} from "../controllers/authController.js";
import { isAdmin, requireSignin } from "../middleware/authMiddelware.js";

// router object-----------------------------
const router = express.Router();

//---------------------routing logic------------------------------
// Register a new user || POST || /api/auth/register/////////////////
router.post("/register", registerController);

// Login a user || POST || /api/auth/login/////////////////////
router.post("/login", loginController);

//test routes
router.get("/test", requireSignin, isAdmin, testController);

//export router------------------------------
export default router;
