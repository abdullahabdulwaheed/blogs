import mongoose from 'mongoose';
import readline from 'readline';

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

console.log('🔧 MongoDB Connection Tester\n');
console.log('This tool will help you find the correct MongoDB password.\n');

const testConnection = async (password) => {
    const uri = `mongodb+srv://abdullahabdulwaheed35_db_user:${encodeURIComponent(password)}@madukkur-blogs.rzev4n6.mongodb.net/mkr-blogs?retryWrites=true&w=majority`;

    try {
        console.log('\n🔄 Testing connection...');
        await mongoose.connect(uri, { serverSelectionTimeoutMS: 5000 });
        console.log('✅ SUCCESS! MongoDB Connected!');
        console.log('\n📝 Update your .env file with this line:');
        console.log(`MONGO_URI=${uri}\n`);
        await mongoose.connection.close();
        return true;
    } catch (error) {
        console.log('❌ FAILED:', error.message);
        return false;
    }
};

const askPassword = () => {
    rl.question('\n🔑 Enter the MongoDB password to test (or "quit" to exit): ', async (password) => {
        if (password.toLowerCase() === 'quit') {
            console.log('\n👋 Goodbye!');
            rl.close();
            process.exit(0);
        }

        if (!password) {
            console.log('⚠️  Password cannot be empty!');
            askPassword();
            return;
        }

        const success = await testConnection(password);

        if (success) {
            rl.close();
            process.exit(0);
        } else {
            console.log('\n💡 Tips:');
            console.log('   - Check if you copied the password correctly from MongoDB Atlas');
            console.log('   - Make sure you updated the password in MongoDB Atlas');
            console.log('   - Wait 1-2 minutes after changing password in Atlas');
            askPassword();
        }
    });
};

console.log('📋 Common passwords to try:');
console.log('   - Abdullah35');
console.log('   - abdullah123');
console.log('   - Abdullah@123');
console.log('   - Or get a new password from MongoDB Atlas\n');

askPassword();
