require('dotenv').config();
const express = require('express');
const cors = require('cors');  // Import cors
const { connectDB } = require('./DB/connectDB');
const authRoutes = require('./routes/auth.route');
const diseaseRoute = require('./routes/disease.route');
const fertilizerRoutes = require('./routes/fertilizer.route');
const InventoryRoute = require('./routes/CommunityRoutes');
const { openAI } = require('openai');
const moredetailsRoute = require('./routes/moreDetails.route');

// Create express app
const app = express();

// Middleware
app.use(express.json()); 
app.use(express.urlencoded({ extended: true }));

// Setup CORS
app.use(cors({
  origin: 'http://localhost:5173',  // Your frontend URL
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allowed methods
  allowedHeaders: ['Content-Type', 'Authorization'], // Allowed headers
  credentials: true, 
}));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/disease', diseaseRoute);
app.use('/api/products', fertilizerRoutes);
app.use("/community", InventoryRoute);
app.use('/api/more', moredetailsRoute);

// Listen for requests
app.listen(process.env.PORT || 4000, () => {
  connectDB();
  console.log(`Listening on port ${process.env.PORT || 4000}`);
});
