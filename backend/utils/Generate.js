const Users = require("../models/Users");
const sendEmail = require('./sendEmail')

function verificationToken(user_email) {
    return new Promise((resolve, reject) => {
        let email = user_email
        try {
            const verificationToken = Math.floor(1000 + Math.random() * 9000).toString();
            const verificationTokenExpires = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24 hours
            Users.updateUser({email, verificationToken,verificationTokenExpires})
            sendEmail(email, 'ChiroHUB_australia => Verify Email', `Your email verificationToken is: ${verificationToken}`); 
            resolve(verificationToken)
        } catch (error) {
            console.log(error)
            reject(error); 
        }
    });
}

const Generate = {
    verificationToken,
};

module.exports = Generate;
