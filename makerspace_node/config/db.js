const mongoose = require('mongoose');
// mongodb://127.0.0.1:27017/
//mongodb+srv://ganeshkrishnagoud:Manga22%40!@cluster0.6yuwlzk.mongodb.net/Makerspace
const connectDB = async () => {
    try {
        console.log('trying to connect')
        const conn = await mongoose.connect('mongodb://127.0.0.1:27017/Makerspace', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.error(`Error: ${error.message}`);
        process.exit(1);
    }
};

module.exports = connectDB;
