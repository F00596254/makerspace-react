const express = require('express');
const bodyParser = require('body-parser');
const connectDB = require('./config/db.js');
const userRoutes = require('./routes/userRoutes.js');
const cors=require('cors')
const emailRoutes = require('./routes/emailRoutes.js')
const ticketRoutes = require('./routes/ticketRoutes.js');
const path = require('path');

const app = express();

// Connect to MongoDB
connectDB();

app.use("/*",cors());
// Middleware
app.use(bodyParser.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Routes
app.use('/api', userRoutes);
app.use('/mail', emailRoutes);
app.use('/ticket', ticketRoutes); 

app.get('/uploads/:filename', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'uploads', req.params.filename));
  });

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Node Server is running on http://localhost:${PORT}`);
});

app.on('error', (error) => {
    console.error(`Server error: ${error.message}`);
});