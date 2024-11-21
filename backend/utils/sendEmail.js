require('dotenv').config();
const sgMail = require('@sendgrid/mail');

const sendEmail = (toEmail, subject, text) => {
  sgMail.setApiKey(process.env.SENDGRID_API_KEY);
  
  const msg = {
    to: toEmail,                   
    from: process.env.FROM_EMAIL,    
    subject: subject,     
    text: text,       
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
