const express = require('express');
const Contact = require('../models/Contact');
const nodemailer = require('nodemailer');
const router = express.Router();

// Simple authorization middleware
const requireAuth = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || authHeader !== `Bearer ${process.env.ADMIN_TOKEN}`) {
    return res.status(401).json({ message: 'Unauthorized' });
  }
  next();
};

// Get all contact messages (admin only)
router.get('/', requireAuth, async (req, res) => {
  try {
    const messages = await Contact.find().sort({ createdAt: -1 });
    res.json(messages);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Submit contact form
router.post('/', async (req, res) => {
  try {
    // Save to database first
    const contact = new Contact(req.body);
    await contact.save();
    console.log('✅ Contact message saved to database:', req.body.name);

    // Try to send email notification
    try {
      const transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS
        },
        tls: {
          rejectUnauthorized: false
        }
      });

      const mailOptions = {
        from: process.env.EMAIL_USER,
        to: 'tanishqthisside860@gmail.com',
        subject: `Portfolio Contact from ${req.body.name}`,
        html: `
          <h3>New Contact Form Submission</h3>
          <p><strong>Name:</strong> ${req.body.name}</p>
          <p><strong>Email:</strong> ${req.body.email}</p>
          <p><strong>Message:</strong></p>
          <p>${req.body.message.replace(/\n/g, '<br>')}</p>
          <hr>
          <p><em>Sent from your portfolio website</em></p>
        `
      };
      
      await transporter.sendMail(mailOptions);
      console.log('✅ Email sent successfully');
      
      res.status(201).json({ 
        message: 'Message sent successfully and email notification delivered!' 
      });
      
    } catch (emailError) {
      console.log('⚠️ Email failed but message saved:', emailError.message);
      
      res.status(201).json({ 
        message: 'Message saved successfully! (Email notification failed - please check email setup)' 
      });
    }
    
  } catch (error) {
    console.error('❌ Contact form error:', error);
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;