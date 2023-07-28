import categoryModel from "../models/categoryModel.js";
import slugify from "slugify";

// create cateory
export const createCategoryController = async (req, res) => {
  try {
    const { name } = req.body;
    if (!name) {
      return res.status(400).json({
        message: "Name is required",
      });
    }

    const existingCategory = await categoryModel.findOne({ name });
    if (existingCategory) {
      return res.status(400).json({
        success: false,
        message: "Category already exists",
      });
    }

    const category = await new categoryModel({ name, slug: slugify(name) });
    category.save();

    res.status(201).json({
      success: true,
      message: "New Category created successfully",
      category,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      error,
      message: "Server Error in Category",
    });
  }
};

// update category-------------------------

export const updateCategoryController = async (req, res) => {
  try {
    const { name } = req.body;
    const { id } = req.params;
    const category = await categoryModel.findByIdAndUpdate(
      id,
      { name, slug: slugify(name) },
      { new: true }
    );

    res.status(200).json({
      success: true,
      message: "Category Updated Successfully",
      category,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Server Error in Update Category",
      error,
    });
  }
};

//get all categories

export const getAllCategoriesController = async (req, res) => {
  try {
    const category = await categoryModel.find({});
    res.status(200).json({
      success: true,
      message: "All Categories",
      category,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Server Error in Get All Categories",
      error,
    });
  }
};

// single category
export const getSingleCategoryController = async (req, res) => {
  try {
    const category = await categoryModel.findOne({ slug: req.params.slug });
    res.status(200).json({
      success: true,
      message: "Single Category get successfully",
      category,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Server Error in Get Single Category",
      error,
    });
  }
};

// delete category -----------------------------
export const deleteCategoryController = async (req, res) => {
  try {
    const { id } = req.params;
    await categoryModel.findByIdAndDelete(id);
    res.status(200).json({
      success: true,
      message: "Category Delete successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Server Error in Delete Category",
      error,
    });
  }
};
