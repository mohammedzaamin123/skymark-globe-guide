
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { MongoClient } = require('mongodb');
const OpenAI = require('openai');
const chatRoutes = require('./routes/chatRoutes');
const trainingRoutes = require('./routes/trainingRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/skymarkdb';
let db;

// Initialize MongoDB connection
async function connectToMongoDB() {
  try {
    const client = new MongoClient(mongoUri);
    await client.connect();
    console.log('Connected to MongoDB');
    db = client.db();
    
    // Make db available to routes
    app.locals.db = db;
    
    // Initialize OpenAI
    const openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY
    });
    app.locals.openai = openai;
    
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  }
}

// Routes
app.use('/api/chat', chatRoutes);
app.use('/api/training', trainingRoutes);

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.status(200).json({ status: 'ok', message: 'Server is running' });
});

// Start server
async function startServer() {
  await connectToMongoDB();
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

startServer().catch(console.error);

module.exports = app;
