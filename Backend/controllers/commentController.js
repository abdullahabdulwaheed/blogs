import Comment from '../models/Comment.js';
import Post from '../models/Post.js';

// @desc    Create a comment
// @route   POST /api/comments
// @access  Public
export const createComment = async (req, res) => {
    const { postId, name, email, content } = req.body;

    const comment = new Comment({
        post: postId,
        user: { name, email },
        content,
    });

    const createdComment = await comment.save();
    res.status(201).json(createdComment);
};

// @desc    Get comments for a post
// @route   GET /api/comments/post/:postId
// @access  Public
export const getCommentsByPost = async (req, res) => {
    const comments = await Comment.find({ post: req.params.postId, isApproved: true }).sort({ createdAt: -1 });
    res.json(comments);
};

// @desc    Get all comments for admin
// @route   GET /api/comments
// @access  Private/Admin
export const getComments = async (req, res) => {
    const comments = await Comment.find({}).populate('post', 'title slug').sort({ createdAt: -1 });
    res.json(comments);
};

// @desc    Approve/Unapprove comment
// @route   PUT /api/comments/:id/approve
// @access  Private/Admin
export const toggleCommentApproval = async (req, res) => {
    const comment = await Comment.findById(req.params.id).populate('post');

    if (comment) {
        // Check if user is super admin or the post author
        if (!req.user.isSuperAdmin && comment.post.author.toString() !== req.user._id.toString()) {
            res.status(403);
            throw new Error('Not authorized to approve this comment');
        }

        comment.isApproved = !comment.isApproved;
        const updatedComment = await comment.save();
        res.json(updatedComment);
    } else {
        res.status(404);
        throw new Error('Comment not found');
    }
};

// @desc    Delete a comment
// @route   DELETE /api/comments/:id
// @access  Private/Admin
export const deleteComment = async (req, res) => {
    const comment = await Comment.findById(req.params.id).populate('post');

    if (comment) {
        // Check if user is super admin or the post author
        if (!req.user.isSuperAdmin && comment.post.author.toString() !== req.user._id.toString()) {
            res.status(403);
            throw new Error('Not authorized to delete this comment');
        }

        await comment.deleteOne();
        res.json({ message: 'Comment removed' });
    } else {
        res.status(404);
        throw new Error('Comment not found');
    }
};

// @desc    Get comments for admin's own posts
// @route   GET /api/comments/admin/my-comments
// @access  Private/Admin
export const getCommentsByAdminPosts = async (req, res) => {
    let query = {};

    // If not super admin, only show comments on their own posts
    if (!req.user.isSuperAdmin) {
        const adminPosts = await Post.find({ author: req.user._id }).select('_id');
        const postIds = adminPosts.map(post => post._id);
        query.post = { $in: postIds };
    }

    const comments = await Comment.find(query)
        .populate('post', 'title slug author')
        .sort({ createdAt: -1 });

    res.json(comments);
};
