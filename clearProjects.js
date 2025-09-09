const mongoose = require('mongoose');
require('dotenv').config();

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Define Project schema (assuming this structure)
const projectSchema = new mongoose.Schema({}, { strict: false });
const Project = mongoose.model('Project', projectSchema);

async function clearProjects() {
  try {
    console.log('Connecting to MongoDB...');
    
    // Delete all projects from database
    const result = await Project.deleteMany({});
    console.log(`✅ Deleted ${result.deletedCount} projects from database`);
    
    console.log('✅ All projects cleared from backend database');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error clearing projects:', error);
    process.exit(1);
  }
}

clearProjects();