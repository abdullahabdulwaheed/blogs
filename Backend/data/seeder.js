import mongoose from 'mongoose';
import dotenv from 'dotenv';
import users from './users.js';
import categoriesData from './categories.js';
import postsData from './posts.js';
import User from '../models/User.js';
import Category from '../models/Category.js';
import Post from '../models/Post.js';
import Comment from '../models/Comment.js';
import connectDB from '../config/db.js';

dotenv.config();

connectDB();

const importData = async () => {
    try {
        await Comment.deleteMany();
        await Post.deleteMany();
        await Category.deleteMany();
        await User.deleteMany();

        const createdUsers = await User.create(users);
        const adminUser = createdUsers[0]._id;

        const createdCategories = await Category.insertMany(categoriesData);

        // Multiply posts to reach 50+ as requested
        const extendedPostsData = [...postsData, ...postsData, ...postsData];

        const samplePosts = extendedPostsData.map((post, index) => {
            // Rotate categories for variation
            const category = createdCategories[index % createdCategories.length]._id;
            // Generate slug from title with index to ensure uniqueness
            const slug = `${post.title.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '')}-${index}`;
            return { ...post, author: adminUser, category, slug };
        });

        await Post.insertMany(samplePosts);

        console.log('Data Imported!');
        process.exit();
    } catch (error) {
        console.error(`${error}`);
        process.exit(1);
    }
};

const destroyData = async () => {
    try {
        await Comment.deleteMany();
        await Post.deleteMany();
        await Category.deleteMany();
        await User.deleteMany();

        console.log('Data Destroyed!');
        process.exit();
    } catch (error) {
        console.error(`${error}`);
        process.exit(1);
    }
};

if (process.argv[2] === '-d') {
    destroyData();
} else {
    importData();
}
