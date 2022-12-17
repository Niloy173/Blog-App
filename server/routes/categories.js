const { default: mongoose } = require("mongoose");
const Category = require("../models/Category.model");
const router = require("express").Router();


router.post("/", async (req,res) => {

  const newCategory = new Category(req.body);
  try {
    const savedCategory = await newCategory.save();
    res.status(200).json(savedCategory);
  } catch (error) {
    res.status(500).json(error.message);
  }
});

router.get("/", async (req,res) => {

  try {
    const allCategory = await Category.find();
    res.status(200).json(allCategory);
  } catch (error) {
    res.status(500).json(error.message);
  }
});

module.exports = router;