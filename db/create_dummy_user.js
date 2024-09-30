require('dotenv').config() //load variables from .env 

const bcrypt = require('bcrypt') //module to run hash function
const db = require('./index.js')

const email = 'user@gah.com'
const plainTextPassword = 'password'
const saltRounds = 10;
const sql = `INSERT INTO
 users 
 (email, password_digest) 
 VALUES  
 ($1, $2)
 RETURNING
 *;`
//returning is a way to view whats been put into db after hashing

//async fn
//1. generate salt
bcrypt.genSalt(saltRounds,  (err, salt) => {
    //async fn
    //2. hash the password with salt
    bcrypt.hash(plainTextPassword, salt, (err, hash) => {
        //3. store in database
        db.query(sql, [email, hash], (err, result) => {
            if (err) {
                console.log(err);
            }
            //4. log new user record
            console.log(result.rows[0]);

        })
    })
})