import Post from '../models/Post.js';
import Category from '../models/Category.js';

// @desc    Fetch all posts
// @route   GET /api/posts
// @access  Public
export const getPosts = async (req, res) => {
    const pageSize = 10;
    const page = Number(req.query.pageNumber) || 1;
    const category = req.query.category || '';
    const keyword = req.query.keyword
        ? {
            title: {
                $regex: req.query.keyword,
                $options: 'i',
            },
        }
        : {};

    let query = { ...keyword };
    if (category) {
        const cat = await Category.findOne({ slug: category });
        if (cat) {
            query.category = cat._id;
        }
    }

    const count = await Post.countDocuments(query);
    const posts = await Post.find(query)
        .populate('author', 'name profileImage')
        .populate('category', 'name slug')
        .limit(pageSize)
        .skip(pageSize * (page - 1))
        .sort({ createdAt: -1 });

    res.json({ posts, page, pages: Math.ceil(count / pageSize) });
};

// @desc    Fetch featured posts
// @route   GET /api/posts/featured
// @access  Public
export const getFeaturedPosts = async (req, res) => {
    const posts = await Post.find({ isFeatured: true })
        .populate('author', 'name profileImage')
        .populate('category', 'name slug')
        .limit(5)
        .sort({ createdAt: -1 });
    res.json(posts);
};

// @desc    Fetch single post by slug
// @route   GET /api/posts/:slug
// @access  Public
export const getPostBySlug = async (req, res) => {
    const post = await Post.findOne({ slug: req.params.slug })
        .populate('author', 'name bio profileImage')
        .populate('category', 'name slug');

    if (post) {
        post.views += 1;
        await post.save();
        res.json(post);
    } else {
        res.status(404);
        throw new Error('Post not found');
    }
};

// @desc    Create a post
// @route   POST /api/posts
// @access  Private/Admin
export const createPost = async (req, res) => {
    const { title, excerpt, content, category, featuredImage, tags, isFeatured } = req.body;

    const slug = title.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '');

    const post = new Post({
        title,
        slug,
        excerpt,
        content,
        author: req.user._id,
        category,
        featuredImage,
        tags,
        isFeatured,
    });

    const createdPost = await post.save();
    res.status(201).json(createdPost);
};

// @desc    Update a post
// @route   PUT /api/posts/:id
// @access  Private/Admin
export const updatePost = async (req, res) => {
    const post = await Post.findById(req.params.id);

    if (post) {
        // Check if user is super admin or the post author
        if (!req.user.isSuperAdmin && post.author.toString() !== req.user._id.toString()) {
            res.status(403);
            throw new Error('Not authorized to update this post');
        }

        post.title = req.body.title || post.title;
        post.excerpt = req.body.excerpt || post.excerpt;
        post.content = req.body.content || post.content;
        post.category = req.body.category || post.category;
        post.featuredImage = req.body.featuredImage || post.featuredImage;
        post.tags = req.body.tags || post.tags;
        post.isFeatured = req.body.isFeatured ?? post.isFeatured;
        post.isPublished = req.body.isPublished ?? post.isPublished;

        const updatedPost = await post.save();
        res.json(updatedPost);
    } else {
        res.status(404);
        throw new Error('Post not found');
    }
};

// @desc    Delete a post
// @route   DELETE /api/posts/:id
// @access  Private/Admin
export const deletePost = async (req, res) => {
    const post = await Post.findById(req.params.id);

    if (post) {
        // Check if user is super admin or the post author
        if (!req.user.isSuperAdmin && post.author.toString() !== req.user._id.toString()) {
            res.status(403);
            throw new Error('Not authorized to delete this post');
        }

        await post.deleteOne();
        res.json({ message: 'Post removed' });
    } else {
        res.status(404);
        throw new Error('Post not found');
    }
};

// @desc    Get related posts
// @route   GET /api/posts/related/:id
// @access  Public
export const getRelatedPosts = async (req, res) => {
    const post = await Post.findById(req.params.id);
    if (post) {
        const related = await Post.find({
            category: post.category,
            _id: { $ne: post._id },
        })
            .limit(3)
            .populate('author', 'name profileImage');
        res.json(related);
    } else {
        res.status(404);
        throw new Error('Post not found');
    }
};

// @desc    Get dashboard stats
// @route   GET /api/posts/admin/stats
// @access  Private/Admin
export const getDashboardStats = async (req, res) => {
    let query = {};

    // If not super admin, only show their own posts stats
    if (!req.user.isSuperAdmin) {
        query.author = req.user._id;
    }

    const totalPosts = await Post.countDocuments(query);
    const totalViews = await Post.aggregate([
        { $match: query },
        { $group: { _id: null, total: { $sum: '$views' } } },
    ]);
    const categoriesCount = await Category.countDocuments();

    // Last 7 days views (mocked for now or logic needed)
    const viewsStats = [
        { label: 'Mon', value: 400 },
        { label: 'Tue', value: 300 },
        { label: 'Wed', value: 600 },
        { label: 'Thu', value: 800 },
        { label: 'Fri', value: 500 },
        { label: 'Sat', value: 900 },
        { label: 'Sun', value: 700 },
    ];

    res.json({
        totalPosts,
        totalViews: totalViews[0]?.total || 0,
        categoriesCount,
        viewsStats,
    });
};

// @desc    Rate a post
// @route   POST /api/posts/:id/rate
// @access  Public
export const ratePost = async (req, res) => {
    const { name, email, rating } = req.body;

    if (!name || !email || !rating) {
        res.status(400);
        throw new Error('Please provide name, email, and rating');
    }

    if (rating < 1 || rating > 5) {
        res.status(400);
        throw new Error('Rating must be between 1 and 5');
    }

    const post = await Post.findById(req.params.id);

    if (post) {
        // Check if user already rated
        const alreadyRated = post.ratings.find(
            (r) => r.user.email === email
        );

        if (alreadyRated) {
            res.status(400);
            throw new Error('You have already rated this post');
        }

        const newRating = {
            user: { name, email },
            rating: Number(rating),
        };

        post.ratings.push(newRating);

        // Calculate average rating
        const totalRating = post.ratings.reduce((acc, item) => item.rating + acc, 0);
        post.averageRating = totalRating / post.ratings.length;

        await post.save();
        res.status(201).json({ message: 'Rating added successfully' });
    } else {
        res.status(404);
        throw new Error('Post not found');
    }
};

// @desc    Get posts by admin (only their own posts)
// @route   GET /api/posts/admin/my-posts
// @access  Private/Admin
export const getPostsByAdmin = async (req, res) => {
    const pageSize = 10;
    const page = Number(req.query.pageNumber) || 1;

    let query = {};

    // If not super admin, only show their own posts
    if (!req.user.isSuperAdmin) {
        query.author = req.user._id;
    }

    const count = await Post.countDocuments(query);
    const posts = await Post.find(query)
        .populate('author', 'name profileImage')
        .populate('category', 'name slug')
        .limit(pageSize)
        .skip(pageSize * (page - 1))
        .sort({ createdAt: -1 });

    res.json({ posts, page, pages: Math.ceil(count / pageSize) });
};
