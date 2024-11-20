require('dotenv').config();
const sgMail = require('@sendgrid/mail');

const sendEmail = (toEmail, subject, text) => {
  sgMail.setApiKey(process.env.SENDGRID_API_KEY);

  // Set up email data
  const msg = {
    to: toEmail,                   // Recipient address
    from: process.env.FROM_EMAIL,       // Sender address (your email or verified sender)
    subject: subject,              // Subject line
    text: text,                    // Plain text body
  };
  
  sgMail
  .send(msg)
  .then(() => console.log(`Email sent to: ${toEmail}. Containing Message: ${text}`))
  .catch(error => {
      console.error('Error sending email:', error);
      if (error.response) {
          console.error('Response error:', error.response.body);
      }
  });
  
};

module.exports = sendEmail;
