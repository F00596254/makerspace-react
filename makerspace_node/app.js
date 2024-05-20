const express = require('express');
const bodyParser = require('body-parser');
const connectDB = require('./config/db.js');
const userRoutes = require('./routes/userRoutes.js');
const cors=require('cors')
const emailRoutes = require('./routes/emailRoutes.js')


const app = express();

// Connect to MongoDB
connectDB();

app.use("/*",cors());
// Middleware
app.use(bodyParser.json());

// Routes
app.use('/api', userRoutes);
app.use('/mail', emailRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Node Server is running on http://localhost:${PORT}`);
});

app.on('error', (error) => {
    console.error(`Server error: ${error.message}`);
});