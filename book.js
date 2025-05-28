// --- Backend Pseudo-Code (Node.js/Express/Nodemailer) ---
// Requires: npm install express nodemailer

const express = require('express');
const nodemailer = require('nodemailer');
const app = express();
app.use(express.json()); // Middleware to parse JSON body

// Configure Nodemailer transporter (replace with your actual email service details)
const transporter = nodemailer.createTransport({
    service: 'gmail', // Example: Use Gmail
    auth: {
        user: 'your-email@gmail.com', // Your email address
        pass: 'your-gmail-app-password' // Your Gmail App Password or service API key
    }
});

// Your email address (where you receive notifications)
const ownerEmail = 'your-business-email@example.com';

app.post('/api/book-appointment', async (req, res) => {
    const { booking_date, user_email } = req.body;

    if (!booking_date || !user_email) {
        return res.status(400).json({ message: 'Missing date or email' });
    }

    // --- Email to User ---
    const mailOptionsUser = {
        from: ownerEmail,
        to: user_email,
        subject: 'Haircut Appointment Request Confirmation',
        text: `Hi there,\n\nWe've received your request for a haircut appointment on ${booking_date} (after 6 PM).\n\nWe will contact you shortly to confirm the exact time.\n\nThanks!`
        // You can use html property for richer email content
    };

    // --- Email to Owner ---
    const mailOptionsOwner = {
        from: 'noreply@yourwebsite.com', // Can be a generic sender
        to: ownerEmail,
        subject: `New Haircut Appointment Request: ${booking_date}`,
        text: `New appointment request:\n\nDate: ${booking_date} (After 6 PM)\nEmail: ${user_email}`
    };

    try {
        await transporter.sendMail(mailOptionsUser);
        await transporter.sendMail(mailOptionsOwner);
        console.log('Emails sent successfully for request on', booking_date);
        res.status(200).json({ message: 'Request received, emails sent!' });
    } catch (error) {
        console.error('Error sending email:', error);
        res.status(500).json({ message: 'Failed to send confirmation emails.' });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
// --- End Backend Pseudo-Code ---