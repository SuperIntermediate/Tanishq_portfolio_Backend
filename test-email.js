const nodemailer = require('nodemailer');
require('dotenv').config();

async function testEmail() {
  try {
    console.log('Testing email configuration...');
    console.log('Email User:', process.env.EMAIL_USER);
    console.log('Email Pass:', process.env.EMAIL_PASS ? 'Set' : 'Not set');

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

    // Verify connection
    await transporter.verify();
    console.log('✅ Email server connection verified');

    // Send test email
    const testEmail = {
      from: process.env.EMAIL_USER,
      to: 'tanishqthisside860@gmail.com',
      subject: 'Portfolio Contact Test',
      html: `
        <h3>Test Email from Portfolio</h3>
        <p><strong>Name:</strong> Test User</p>
        <p><strong>Email:</strong> test@example.com</p>
        <p><strong>Message:</strong> This is a test message to verify email functionality.</p>
        <hr>
        <p><em>Sent from your portfolio website</em></p>
      `
    };

    await transporter.sendMail(testEmail);
    console.log('✅ Test email sent successfully to tanishqthisside860@gmail.com');
    
  } catch (error) {
    console.error('❌ Email test failed:', error.message);
  }
}

testEmail();