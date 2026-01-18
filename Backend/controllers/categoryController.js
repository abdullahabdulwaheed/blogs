import Category from '../models/Category.js';
import Post from '../models/Post.js';

// @desc    Get all categories
// @route   GET /api/categories
// @access  Public
export const getCategories = async (req, res) => {
    const categories = await Category.find({});

    // Update counts dynamically
    const categoriesWithCounts = await Promise.all(
        categories.map(async (cat) => {
            const count = await Post.countDocuments({ category: cat._id });
            return { ...cat._doc, count };
        })
    );

    res.json(categoriesWithCounts);
};

// @desc    Create a category
// @route   POST /api/categories
// @access  Private/Admin
export const createCategory = async (req, res) => {
    const { name, description, icon } = req.body;
    const slug = name.toLowerCase().replace(/ /g, '-');

    const categoryExists = await Category.findOne({ slug });

    if (categoryExists) {
        res.status(400);
        throw new Error('Category already exists');
    }

    const category = await Category.create({
        name,
        slug,
        description,
        icon,
    });

    res.status(201).json(category);
};

// @desc    Update a category
// @route   PUT /api/categories/:id
// @access  Private/Admin
export const updateCategory = async (req, res) => {
    const category = await Category.findById(req.params.id);

    if (category) {
        category.name = req.body.name || category.name;
        category.description = req.body.description || category.description;
        category.icon = req.body.icon || category.icon;
        category.slug = category.name.toLowerCase().replace(/ /g, '-');

        const updatedCategory = await category.save();
        res.json(updatedCategory);
    } else {
        res.status(404);
        throw new Error('Category not found');
    }
};

// @desc    Delete a category
// @route   DELETE /api/categories/:id
// @access  Private/Admin
export const deleteCategory = async (req, res) => {
    const category = await Category.findById(req.params.id);

    if (category) {
        const postsWithCategory = await Post.countDocuments({ category: category._id });
        if (postsWithCategory > 0) {
            res.status(400);
            throw new Error('Cannot delete category with associated posts');
        }
        await category.deleteOne();
        res.json({ message: 'Category removed' });
    } else {
        res.status(404);
        throw new Error('Category not found');
    }
};
