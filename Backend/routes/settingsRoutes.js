import express from 'express';
import asyncHandler from 'express-async-handler';
import Settings from '../models/Settings.js';
import { protect, superAdmin } from '../middleware/authMiddleware.js';

const router = express.Router();

// @desc    Get Settings
// @route   GET /api/settings
// @access  Public
router.get('/', asyncHandler(async (req, res) => {
    const settings = await Settings.findOne();
    if (settings) {
        res.json(settings);
    } else {
        // Return default if not set
        res.json({
            siteName: 'The Daily Post',
            siteTitle: 'News & Editorial',
            logo: '/logo-news.svg',
            socials: { facebook: '', twitter: '', instagram: '', linkedin: '' }
        });
    }
}));

// @desc    Update Settings
// @route   PUT /api/settings
// @access  Private/SuperAdmin
router.put('/', protect, superAdmin, asyncHandler(async (req, res) => {
    let settings = await Settings.findOne();

    if (settings) {
        settings.siteName = req.body.siteName || settings.siteName;
        settings.siteTitle = req.body.siteTitle || settings.siteTitle;
        settings.logo = req.body.logo || settings.logo;
        settings.socials = req.body.socials || settings.socials;

        const updatedSettings = await settings.save();
        res.json(updatedSettings);
    } else {
        const newSettings = new Settings({
            siteName: req.body.siteName,
            siteTitle: req.body.siteTitle,
            logo: req.body.logo,
            socials: req.body.socials
        });
        const createdSettings = await newSettings.save();
        res.json(createdSettings);
    }
}));

export default router;
