const mongoose = require('mongoose');

const ProjectSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  technologies: [String],
  githubUrl: String,
  liveUrl: String,
  imageUrl: String,
  category: String,
  keyFeatures: [String],
  impact: String,
  duration: String,
  role: String,
  featured: { type: Boolean, default: false }
}, { timestamps: true });

module.exports = mongoose.model('Project', ProjectSchema);