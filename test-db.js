const mongoose = require('mongoose');
require('dotenv').config();

const Project = require('./models/Project');

async function testDatabase() {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Connected to MongoDB');

    // Test creating a project
    const testProject = new Project({
      title: 'Test Project',
      description: 'This is a test project to verify database connection',
      technologies: ['Node.js', 'MongoDB', 'Express'],
      githubUrl: 'https://github.com/test/project',
      liveUrl: 'https://test-project.com',
      imageUrl: 'https://via.placeholder.com/600x400',
      featured: false
    });

    await testProject.save();
    console.log('✅ Test project created:', testProject.title);

    // Fetch all projects
    const projects = await Project.find();
    console.log('✅ Total projects in database:', projects.length);

    // Clean up test project
    await Project.findByIdAndDelete(testProject._id);
    console.log('✅ Test project cleaned up');

    process.exit(0);
  } catch (error) {
    console.error('❌ Database test failed:', error);
    process.exit(1);
  }
}

testDatabase();