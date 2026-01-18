import express from 'express';
import {
    authUser,
    registerUser,
    getUserProfile,
    updateUserProfile,
    createUser,
    getUsers,
    deleteUser,
    getUserById,
    updateUser,
} from '../controllers/userController.js';
import { protect, admin, superAdmin } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/create', protect, superAdmin, createUser);
router.route('/').post(registerUser).get(protect, superAdmin, getUsers);
router.post('/login', authUser);
router
    .route('/profile')
    .get(protect, getUserProfile)
    .put(protect, updateUserProfile);

router
    .route('/:id')
    .delete(protect, superAdmin, deleteUser)
    .get(protect, superAdmin, getUserById)
    .put(protect, superAdmin, updateUser);

export default router;
