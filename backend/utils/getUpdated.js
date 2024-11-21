const sendEmail = require('./sendEmail');
const Seminar = require('../models/seminars');

async function checkAndSendReminders() {
    try {
        const now = new Date();
        const soon = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000);

        const seminars = await Seminar.getSeminars();

        for (let seminar of seminars) {
            const emailList = seminar.username_list; // Assume it's already an array
            const seminarDate = new Date(seminar.date);

            if (seminarDate >= now && seminarDate <= soon) {
                emailList.forEach(email => {
                    sendEmail(email, seminar.title, `Don't forget, ${seminar.title} is starting: ${seminar.date}`);
                });
            }
        }
    } catch (error) {
        console.error("Error in checkAndSendReminders:", error);
    }
}

module.exports = {
    checkAndSendReminders
};