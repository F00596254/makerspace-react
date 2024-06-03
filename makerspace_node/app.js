const express = require("express");
const bodyParser = require("body-parser");
const connectDB = require("./config/db.js");
const userRoutes = require("./routes/userRoutes.js");
const emailRoutes = require("./routes/emailRoutes.js");
const cors = require("cors");
// const key= require("./config/secret.js");
const session = require("express-session");
const MongoDBStore = require("connect-mongodb-session")(session);

// Initialize Express app
const app = express();
const store = new MongoDBStore({
  uri: "mongodb://localhost:27017/makerspace",
  collection: "sessions",
});

// Connect to MongoDB
connectDB();

// Configure CORS to allow credentials (cookies) from the frontend
app.use(
  cors({
    origin: "http://localhost:5174", // React app's origin
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

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Node Server is running on http://localhost:${PORT}`);
});

// Error handling
app.on("error", (error) => {
  console.error(`Server error: ${error.message}`);
});
