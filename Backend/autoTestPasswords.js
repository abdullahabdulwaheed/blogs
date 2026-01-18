import mongoose from 'mongoose';

console.log('🔧 Auto-Testing Common Password Variations\n');

const passwords = [
    'Abdullah35',
    'abdullah35',
    'Abdullah@123',
    'abdullah123',
    'Abdullah123',
    'Abdullah@35',
    'password123',
    'admin123',
];

const testConnection = async (password) => {
    const uri = `mongodb+srv://abdullahabdulwaheed35_db_user:${encodeURIComponent(password)}@madukkur-blogs.rzev4n6.mongodb.net/mkr-blogs?retryWrites=true&w=majority`;

    try {
        console.log(`🔄 Testing: "${password}"...`);
        await mongoose.connect(uri, { serverSelectionTimeoutMS: 5000 });
        console.log(`\n✅✅✅ SUCCESS! Password found: "${password}" ✅✅✅\n`);
        console.log('📝 Update your .env file line 2 with:');
        console.log(`MONGO_URI=mongodb+srv://abdullahabdulwaheed35_db_user:${password}@madukkur-blogs.rzev4n6.mongodb.net/mkr-blogs?retryWrites=true&w=majority\n`);
        await mongoose.connection.close();
        return true;
    } catch (error) {
        console.log(`   ❌ Failed: ${error.message.split('\n')[0]}`);
        return false;
    }
};

const testAll = async () => {
    for (const password of passwords) {
        const success = await testConnection(password);
        if (success) {
            process.exit(0);
        }
        // Small delay between attempts
        await new Promise(resolve => setTimeout(resolve, 500));
    }

    console.log('\n❌ None of the common passwords worked.\n');
    console.log('📋 Next Steps:');
    console.log('1. Go to MongoDB Atlas: https://cloud.mongodb.com/');
    console.log('2. Navigate to Database Access');
    console.log('3. Edit user: abdullahabdulwaheed35_db_user');
    console.log('4. Reset the password to: Abdullah35');
    console.log('5. Wait 1-2 minutes');
    console.log('6. Run: node testConnection.js\n');

    process.exit(1);
};

testAll();
