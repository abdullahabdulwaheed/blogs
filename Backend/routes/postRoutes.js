import express from 'express';
import {
    getPosts,
    getPostBySlug,
    getFeaturedPosts,
    createPost,
    updatePost,
    deletePost,
    getRelatedPosts,
    getDashboardStats,
    ratePost,
    getPostsByAdmin,
} from '../controllers/postController.js';
import { protect, admin, adminOrSuperAdmin } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/').get(getPosts).post(protect, adminOrSuperAdmin, createPost);
router.get('/featured', getFeaturedPosts);
router.get('/admin/stats', protect, adminOrSuperAdmin, getDashboardStats);
router.get('/admin/my-posts', protect, adminOrSuperAdmin, getPostsByAdmin);
router.get('/related/:id', getRelatedPosts);
router.post('/:id/rate', ratePost);
router.get('/:slug', getPostBySlug);
router
    .route('/:id')
    .put(protect, adminOrSuperAdmin, updatePost)
    .delete(protect, adminOrSuperAdmin, deletePost);

export default router;
