const sendEmail = require('./sendEmail');

async function contactUs(formData) {
    try {
        sendEmail(process.env.FROM_EMAIL, formData.subject, `Message: ${formData.message}; from ${formData.email}`); 
    } catch (error) {
        console.error("Error in contacting:", error);
    }
}

module.exports = {
    contactUs
};