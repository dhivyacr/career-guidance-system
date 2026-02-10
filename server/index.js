const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

// Initialize Express
const app = express();

// Middleware
app.use(express.json()); // Parses incoming JSON requests
app.use(cors());         // Allows your React app to talk to this server

// Import Routes
const authRoute = require('./routes/auth');
const profileRoute = require('./routes/profile');

// Use Routes
app.use('/api/auth', authRoute);
app.use('/api/profile', profileRoute);

// Basic test route
app.get('/', (req, res) => {
    res.send("Career Guidance Server is Running!");
});

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("✅ MongoDB Connected Successfully"))
    .catch(err => console.error("❌ MongoDB Connection Error:", err));

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
});