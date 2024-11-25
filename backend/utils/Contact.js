const sendEmail = require('./sendEmail');

async function contactUs(formData) {
    try {
        sendEmail(formData.email, formData.subject, `Message: ${formData.message}`); 
    } catch (error) {
        console.error("Error in contacting:", error);
    }
}

module.exports = {
    contactUs
};