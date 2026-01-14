const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware - Configure CORS to allow Vercel domains
app.use(cors({
  origin: [
    'https://www.sreyamnambiar.com',
    'https://sreyamnambiar.com',
    'https://portfolio-three-beryl-84.vercel.app',
    /\.vercel\.app$/,  // Allow all Vercel preview deployments
    'http://localhost:5173'  // Allow local development
  ],
  methods: ['GET', 'POST', 'OPTIONS'],
  credentials: true
}));
app.use(express.json());

// Email transporter configuration
const transporter = nodemailer.createTransport({
  service: 'gmail', // or 'outlook', 'yahoo', etc.
  auth: {
    user: process.env.EMAIL_USER, // your email
    pass: process.env.EMAIL_PASSWORD, // your email password or app password
  },
});

// Contact form endpoint
app.post('/api/contact', async (req, res) => {
  const { name, email, subject, message } = req.body;

  // Validate input
  if (!name || !email || !subject || !message) {
    return res.status(400).json({ 
      success: false, 
      message: 'All fields are required' 
    });
  }

  // Email options
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: process.env.EMAIL_USER, // your email to receive messages
    replyTo: email,
    subject: `Portfolio Contact: ${subject}`,
    html: `
      <div style="font-family: Arial, sans-serif; padding: 20px; background-color: #f4f4f4;">
        <div style="max-width: 600px; margin: 0 auto; background-color: white; padding: 30px; border-radius: 10px;">
          <h2 style="color: #6c5ce7;">New Contact Form Submission</h2>
          <hr style="border: 1px solid #e0e0e0;">
          
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Subject:</strong> ${subject}</p>
          
          <h3 style="color: #6c5ce7; margin-top: 20px;">Message:</h3>
          <div style="background-color: #f8f8f8; padding: 15px; border-radius: 5px; border-left: 4px solid #6c5ce7;">
            <p style="white-space: pre-wrap;">${message}</p>
          </div>
          
          <hr style="border: 1px solid #e0e0e0; margin-top: 30px;">
          <p style="color: #888; font-size: 12px;">This message was sent from your portfolio contact form.</p>
        </div>
      </div>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).json({ 
      success: true, 
      message: 'Email sent successfully!' 
    });
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Failed to send email. Please try again later.' 
    });
  }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'Server is running!' });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
