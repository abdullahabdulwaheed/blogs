import mongoose from 'mongoose';

const postSchema = mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
        },
        slug: {
            type: String,
            required: true,
            unique: true,
        },
        excerpt: {
            type: String,
            required: true,
        },
        content: {
            type: String,
            required: true,
        },
        author: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'User',
        },
        category: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'Category',
        },
        featuredImage: {
            type: String,
            required: true,
        },
        isFeatured: {
            type: Boolean,
            default: false,
        },
        isPublished: {
            type: Boolean,
            default: true,
        },
        views: {
            type: Number,
            default: 0,
        },
        readingTime: {
            type: Number,
            default: 5,
        },
        tags: [String],
        ratings: [
            {
                user: {
                    name: { type: String, required: true },
                    email: { type: String, required: true },
                },
                rating: { type: Number, required: true, min: 1, max: 5 },
                createdAt: { type: Date, default: Date.now },
            },
        ],
        averageRating: {
            type: Number,
            default: 0,
        },
    },
    {
        timestamps: true,
    }
);

const Post = mongoose.model('Post', postSchema);

export default Post;
