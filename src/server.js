require('dotenv').config();
const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');

const app = express();
const PORT = 3000; 

app.use(cors());
app.use(express.json());

app.post('/send-email', async (req, res) => {
  const { name, email, message } = req.body;


  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      }      
  });

  // Mail content
  const mailOptions = {
    from: email,
    to: 'jakhila2806@gmail.com',
    subject: `New Contact Form Submission from ${name}`,
    text: `Name: ${name}\nEmail: ${email}\nMessage:\n${message}`,
  };

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: 'Email sent successfully!' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Email failed to send' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
