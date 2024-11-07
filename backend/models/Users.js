const db = require('../db')

function createUser(email, username, hash, role = 'user') {
    console.log(email, username, hash, role)
        let sql = `
        INSERT INTO chiro_users
        (email, username, password_digest, role) 
        VALUES ($1, $2, $3, $4)
        RETURNING *;
        `
        return db.query(sql, [email, username, hash, role])
        .then(res=>res.rows)
}

function findByEmail(email) {
    let sql = `
    SELECT * FROM chiro_users WHERE email = $1;
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
    SELECT * FROM chiro_users WHERE username = $1;
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
    UPDATE chiro_users SET seminar_id = ARRAY_APPEND(seminar_id, $1) where email = $2;
    `
    return db.query(sql, [seminar_id, email])
            .then(result => result.rows)
}

function deleteSeminarFromUser(seminar_id, email) {
    let sql = `
    UPDATE chiro_users SET seminar_id = ARRAY_REMOVE($1) where email = $2;
    `
    return db.query(sql, [seminar_id, email])
            .then(result => result.rows)
}

function updateProfilePic(email, filePath) {
    let sql = `
    UPDATE chiro_users SET profile_pic_url = $1 WHERE email = $2 RETURNING *;
    `;
    return db.query(sql, [filePath, email])
        .then(result => result.rows[0]);
}

function addFavouriteSeminar(seminar_id, user_id) {
    let sql = `
    UPDATE chiro_users
    SET seminar_id = 
        CASE
            WHEN seminar_id IS NULL THEN ARRAY[$1] 
            WHEN array_position(seminar_id, $1) IS NULL THEN seminar_id || ARRAY[$1]  
            ELSE seminar_id 
        END
    WHERE id = $2;
    `
    return db.query(sql, [seminar_id, user_id]).then(res => res.rows);
}



function removeFavouriteSeminar(fav_id, user_id) {
    let sql = `
    UPDATE chiro_users
    SET seminar_id = array_remove(seminar_id, $1)
    WHERE id = $2 AND $1 = ANY(seminar_id);
    `
    return db.query(sql, [fav_id, user_id]).then(res => res.rows);
}


const User = {
    findByEmail,
    createUser,
    findByUsername,
    saveSeminarToUser,
    deleteSeminarFromUser,
    updateProfilePic,
    addFavouriteSeminar,
    removeFavouriteSeminar
}

module.exports = User