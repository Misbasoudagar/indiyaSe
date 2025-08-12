import Category from '../models/Category.js';

// Create new category with subcategories
export const createCategory = async (req, res) => {
  const { name, subcategories } = req.body;

  try {
    const category = new Category({
      name,
      subcategories,
    });

    await category.save();
    res.status(201).json(category);
  } catch (error) {
    res.status(500).json({ message: 'Failed to create category', error });
  }
};

// Get all categories with subcategories
export const getAllCategories = async (req, res) => {
  try {
    const categories = await Category.find();
    res.json(categories);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch categories', error });
  }
};
