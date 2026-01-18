import express from 'express';
import asyncHandler from 'express-async-handler';
import Banner from '../models/Banner.js';
import { protect, admin } from '../middleware/authMiddleware.js';

const router = express.Router();

// @desc    Fetch all active banners
// @route   GET /api/banners
// @access  Public
router.get('/', asyncHandler(async (req, res) => {
    const banners = await Banner.find({ isActive: true }).sort({ order: 1 });
    res.json(banners);
}));

// @desc    Fetch all banners (Admin)
// @route   GET /api/banners/admin
// @access  Private/Admin
router.get('/admin', protect, admin, asyncHandler(async (req, res) => {
    const banners = await Banner.find({}).sort({ order: 1 });
    res.json(banners);
}));

// @desc    Create a banner
// @route   POST /api/banners
// @access  Private/Admin
router.post('/', protect, admin, asyncHandler(async (req, res) => {
    const { title, subtitle, desc, image, isActive, order } = req.body;
    const banner = new Banner({ title, subtitle, desc, image, isActive, order });
    const createdBanner = await banner.save();
    res.status(201).json(createdBanner);
}));

// @desc    Update a banner
// @route   PUT /api/banners/:id
// @access  Private/Admin
router.put('/:id', protect, admin, asyncHandler(async (req, res) => {
    const banner = await Banner.findById(req.params.id);

    if (banner) {
        banner.title = req.body.title || banner.title;
        banner.subtitle = req.body.subtitle || banner.subtitle;
        banner.desc = req.body.desc || banner.desc;
        banner.image = req.body.image || banner.image;
        banner.isActive = req.body.isActive !== undefined ? req.body.isActive : banner.isActive;
        banner.order = req.body.order !== undefined ? req.body.order : banner.order;

        const updatedBanner = await banner.save();
        res.json(updatedBanner);
    } else {
        res.status(404);
        throw new Error('Banner not found');
    }
}));

// @desc    Delete a banner
// @route   DELETE /api/banners/:id
// @access  Private/Admin
router.delete('/:id', protect, admin, asyncHandler(async (req, res) => {
    const banner = await Banner.findById(req.params.id);

    if (banner) {
        await banner.deleteOne();
        res.json({ message: 'Banner removed' });
    } else {
        res.status(404);
        throw new Error('Banner not found');
    }
}));

export default router;
