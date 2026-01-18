import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from './models/User.js';

dotenv.config();

const testConnection = async () => {
    try {
        console.log('Attempting to connect to MongoDB...');
        console.log('URI:', process.env.MONGO_URI.replace(/:[^:@]+@/, ':****@')); // Hide password

        await mongoose.connect(process.env.MONGO_URI);
        console.log('✅ MongoDB Connected Successfully!');

        // Check existing users
        const users = await User.find({});
        console.log('\n📋 Existing users in database:');
        users.forEach(user => {
            console.log(`  - ${user.name} (${user.email})`);
            console.log(`    isAdmin: ${user.isAdmin}, isSuperAdmin: ${user.isSuperAdmin}`);
        });

        console.log(`\n📊 Total users: ${users.length}`);

        process.exit(0);
    } catch (error) {
        console.error('❌ Error:', error.message);
        process.exit(1);
    }
};

testConnection();
