const express = require('express');
const bodyParser = require('body-parser');
const connectDB = require('./config/db.js');
const userRoutes = require('./routes/userRoutes.js');
const cors=require('cors')
const emailRoutes = require('./routes/emailRoutes.js')
const ticketRoutes = require('./routes/ticketRoutes.js');
const path = require('path');
const privilegeRoutes = require('./routes/privilegeRoutes');
const roleRoutes = require('./routes/roleRoutes');

// const key= require("./config/secret.js");
const session = require("express-session");
const MongoDBStore = require("connect-mongodb-session")(session);
require('dotenv').config();
const multer = require('multer');
const upload = multer({ dest: 'uploads/' }); // Adjust the destination folder as needed

const app = express();
const store = new MongoDBStore({
  uri: process.env.URI,
  collection: "sessions",
});

// Connect to MongoDB
connectDB();

// Configure CORS to allow credentials (cookies) from the frontend
app.use(
  cors({
    origin: ["http://localhost:5174", "http://localhost:5173"], // React app's origin
    credentials: true, // Allow cookies to be sent with requests
  })
);

// Middleware
app.use(bodyParser.json());

// app.use(session({
//     secret: 'makerspace',
//     resave: false,
//     saveUninitialized: false,
//     store: store,
//     cookie: {
//       secure: false,
//       maxAge: 1000 * 60 * 60 * 24
//     }
//   }));

app.use(
  session({
    secret: "makerspace",
    resave: false,
    saveUninitialized: false,
    store: store,
  })
);
// Routes
app.use("/api", userRoutes);
app.use("/mail", emailRoutes);
app.use('/ticket', ticketRoutes);
app.get('/uploads/:filename', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'uploads', req.params.filename));
  });
app.use('/privilege', privilegeRoutes);
app.use('/role', roleRoutes);


// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Node Server is running on http://localhost:${PORT}`);
});

// Error handling
app.on("error", (error) => {
  console.error(`Server error: ${error.message}`);
});
