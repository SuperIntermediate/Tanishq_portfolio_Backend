const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Middleware
const corsOptions = {
  origin: process.env.CORS_ORIGIN,
  credentials: true,
};

app.use(cors(corsOptions));
app.use(express.json());

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('✅ MongoDB connected'))
.catch(err => console.error('❌ MongoDB connection error:', err));

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'Backend is running!', timestamp: new Date().toISOString() });
});

// Routes
app.use('/api/projects', require('./routes/projects'));
app.use('/api/contact', require('./routes/contact'));

const PORT = process.env.PORT || 5002;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
