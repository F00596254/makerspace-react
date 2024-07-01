const mongoose = require('mongoose');
require('dotenv').config();
// mongodb://127.0.0.1:27017/
//mongodb+srv://ganeshkrishnagoud:Manga22%40!@cluster0.6yuwlzk.mongodb.net/Makerspace
const connectDB = async () => {
    try {
        // const conn = await mongoose.connect('mongodb://127.0.0.1:27017/Makerspace', {
        const conn = await mongoose.connect(process.env.URI, {
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
