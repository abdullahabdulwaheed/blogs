import express from 'express';
import {
    createComment,
    getCommentsByPost,
    getComments,
    toggleCommentApproval,
    deleteComment,
    getCommentsByAdminPosts,
} from '../controllers/commentController.js';
import { protect, admin, adminOrSuperAdmin } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/').get(protect, admin, getComments).post(createComment);
router.get('/admin/my-comments', protect, adminOrSuperAdmin, getCommentsByAdminPosts);
router.get('/post/:postId', getCommentsByPost);
router.put('/:id/approve', protect, adminOrSuperAdmin, toggleCommentApproval);
router.delete('/:id', protect, adminOrSuperAdmin, deleteComment);

export default router;
