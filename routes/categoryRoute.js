import express from "express";
import {
  createCategoryController,
  deleteCategoryController,
  getAllCategoriesController,
  getSingleCategoryController,
  updateCategoryController,
} from "../controllers/categoryController.js";
import { isAdmin, requireSignin } from "../middleware/authMiddelware.js";

const router = express.Router();

router.post(
  "/create-category",
  requireSignin,
  isAdmin,
  createCategoryController
);
router.put(
  "/update-category/:id",
  requireSignin,
  isAdmin,
  updateCategoryController
);
router.get(
  "/all-categories",
  requireSignin,
  isAdmin,
  getAllCategoriesController
);
router.get(
  "/single-category/:slug",
  requireSignin,
  isAdmin,
  getSingleCategoryController
);
router.delete(
  "/delete-category/:id",
  requireSignin,
  isAdmin,
  deleteCategoryController
);

export default router;
