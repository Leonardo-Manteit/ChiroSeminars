const db = require('../db')

function createUser(email, username, hash, role = 'user') {
        let sql = `
        INSERT INTO users
        (email, username, password_digest, role) 
        VALUES ($1, $2, $3, $4)
        RETURNING *;
        `
        return db.query(sql, [email, username, hash, role])
        .then(res=>res.rows)
}

function findByEmail(email) {
    let sql = `
    SELECT * FROM users WHERE email = $1;
    `
    return db.query(sql, [email])
            .then(result => {
                if(result.rowCount === 0) {
                    let err = new Error('resource not found')
                    err.status = 400
                    throw err
                }
                return result.rows[0]
            })
}

function findByUsername(username) {
    let sql = `
    SELECT * FROM users WHERE username = $1;
    `
    return db.query(sql, [username])
            .then(result => {
                if(result.rowCount === 0) {
                    let err = new Error('resource not found')
                    err.status = 400
                    throw err
                }
                return result.rows[0]
            })
}

function saveSeminarToUser(seminar_id, email) {
    let sql = `
    UPDATE users SET seminar_id = ARRAY_APPEND(seminar_id, $1) where email = $2;
    `
    return db.query(sql, [seminar_id, email])
            .then(result => result.rows)
}

function deleteSeminarFromUser(seminar_id, email) {
    let sql = `
    UPDATE users SET seminar_id = ARRAY_REMOVE($1) where email = $2;
    `
    return db.query(sql, [seminar_id, email])
            .then(result => result.rows)
}

const User = {
    findByEmail,
    createUser,
    findByUsername,
    saveSeminarToUser,
    deleteSeminarFromUser
}

module.exports = User