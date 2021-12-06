const router = require('express').Router();
const Category = require('../models/Category');

// Get all categories
router.get('/', async (req, res) => {
  try {
    const allCategories = await Category.find({});
    res.status(200).json(allCategories);
  } catch (error) {
    res.status(500).json(error);
  }
});

// Create catreogry
router.post('/', async (req, res) => {
  try {
    const newCategory = new Category(req.body);
    let createdCategory = await newCategory.save();
    res.status(200).json(createdCategory);
  } catch (error) {
    res.status(500).json(err);
  }
});

// Single category
// Update category
// Delte category

module.exports = router;
