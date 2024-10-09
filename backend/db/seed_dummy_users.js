require('dotenv').config();
const bcrypt = require('bcrypt');
const db = require('./index.js');

const usernames = ['alex', 'leo', 'mike', 'sara', 'john', 'jane', 'bob'];
const emails = ['alex@gah.com', 'leo@gah.com', 'mike@gah.com', 'sara@gah.com', 'john@gah.com', 'jane@gah.com', 'bob@gah.com'];
const plainTextPasswords = ['password1', 'password2', 'password3', 'password4', 'password5', 'password6', 'password7'];
const saltRounds = 10;

function getRandomUser() {
  const index = Math.floor(Math.random() * usernames.length);
  return {
    username: usernames[index],
    email: emails[index],
    password: plainTextPasswords[index],
  };
}

function newUser() {
  const user = getRandomUser();
  return user;
}

const sql = `INSERT INTO
  users 
  (username, email, password_digest, seminar_id) 
  VALUES  
  ($1, $2, $3, $4)
  RETURNING
  *;`;

const seedUsers = async () => {
  const user = newUser();
  const salt = await bcrypt.genSalt(saltRounds);
  const hashedPassword = await bcrypt.hash(user.password, salt);

  db.query(sql, [user.username, user.email, hashedPassword, null], (err, result) => {
    if (err) {
      console.log(err);
    } else {
      console.log('User added:', result.rows[0]);
    }
  });
};

seedUsers();
