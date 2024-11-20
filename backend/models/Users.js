const db = require('../db')

function createUser(email, username, hash, role = 'user') {
    let sql = `
        INSERT INTO chiro_users 
        (email, username, password_digest, role, is_verified)
        VALUES ($1, $2, $3, $4, $5) 
        RETURNING *
    `
    return db.query(sql, [email, username, hash, role, false])
    .then(res=>res.rows)
}

function updateUser({email, username=null, hash=null, role=null, verificationToken=null, verificationTokenExpires=null}) {
    // Start building the SQL query
    let sql = `UPDATE chiro_users SET `;
    const params = [];
    let paramIndex = 1;

    // Add fields to update only if their values are not null
    if (email !== null) {
        sql += `email = $${paramIndex}, `;
        params.push(email);
        paramIndex++;
    }
    if (username !== null) {
        sql += `username = $${paramIndex}, `;
        params.push(username);
        paramIndex++;
    }
    if (hash !== null) {
        sql += `password_digest = $${paramIndex}, `;
        params.push(hash);
        paramIndex++;
    }
    if (role !== null) {
        sql += `role = $${paramIndex}, `;
        params.push(role);
        paramIndex++;
    }
    if (verificationToken !== null) {
        sql += `verification_token = $${paramIndex}, `;
        params.push(verificationToken);
        paramIndex++;
    }
    if (verificationTokenExpires !== null) {
        sql += `verification_token_expires = $${paramIndex}, `;
        params.push(verificationTokenExpires);
        paramIndex++;
    }

    sql = sql.replace(/, $/, '');
    sql +=  ` WHERE email = $${paramIndex}`

    return db.query(sql, [...params, email]).then(res => res.rows);

    // must be called like this: Users.updateUser({verificationToken,verificationTokenExpires})
}


function verifyUserEmail(email, token) {
    console.log('verifyUserEmail', email, token);

    // SQL query updated to check both verification token and email
    let sql = `
        UPDATE chiro_users SET 
        is_verified = true, verification_token = NULL, 
        verification_token_expires = NULL
        WHERE verification_token = $1 
        AND email = $2 
        AND verification_token_expires > NOW() 
        RETURNING *
    `;

    return db.query(sql, [token, email])
    .then(res => res.rows)
    .catch(error => {
        console.error('Error verifying user email:', error);
        throw error;
    });
};


function deleteUser(id) {
        let sql = `
        DELETE FROM chiro_users WHERE id = $1;
        `
        return db.query(sql, [id])
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
    verifyUserEmail,
    findByUsername,
    saveSeminarToUser,
    deleteSeminarFromUser,
    updateProfilePic,
    addFavouriteSeminar,
    removeFavouriteSeminar,
    deleteUser,
    updateUser
}

module.exports = User