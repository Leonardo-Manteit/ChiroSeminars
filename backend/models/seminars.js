const db = require('../db')

function createSeminar(user_id, title, organizer, start_date, finish_date, location, description, standard_price, student_price, assistant_price, contact, image, featured, topics) {
    let sql = `INSERT INTO chiro_seminars   
    (user_id, title, organizer, start_date, finish_date, location, description, standard_price, student_price, assistant_price, contact, image_url, featured, topics)
    VALUES 
    ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14)
    RETURNING *;
    `
    return db.query(sql, [user_id, title, organizer, start_date, finish_date, location, description, standard_price, student_price, assistant_price, contact, image, featured, topics])
    .then(res => res.rows)
}

function updateSeminar(title, organizer, start_date, finish_date, location, description, standard_price, student_price, assistant_price, contact, image, featured, topics, id) {
    let sql = `UPDATE chiro_seminars
    SET 
        title = $1,
        organizer = $2,
        start_date = $3,
        finish_date = $4,
        location = $5,
        description = $6,
        standard_price = $7,
        student_price = $8,
        assistant_price = $9,
        contact = $10,
        image_url = $11,
        featured = $12,
        topics = $13
    WHERE id = $14
    RETURNING *;
    `
    return db.query(sql, [title, organizer, start_date, finish_date, location, description, standard_price, student_price, assistant_price, contact, image, featured, topics, id])
            .then(res => res.rows)
}

function deleteSeminar(seminar_id) {
    let sql = 'DELETE FROM chiro_seminars WHERE id = $1 RETURNING *;'
    return db.query(sql, [seminar_id]).then(res => res.rows[0])
}

function featureSeminar(featured, seminar_id) {
    let sql = `UPDATE chiro_seminars
    SET 
    featured = $1
    WHERE id = $2
    RETURNING *;`
    return db.query(sql, [featured, seminar_id]).then(res => res.rows)
}

function getFeaturedSeminars() {
    let sql = `SELECT * FROM chiro_seminars WHERE featured = 'on';`
    return db.query(sql).then(res => res.rows)
}

function getSeminars() {
    let sql = `SELECT * FROM chiro_seminars;`
    return db.query(sql).then(res => res.rows)
}

function getSeminarById(seminar_id) {
    let sql = `
    SELECT * FROM chiro_seminars WHERE id = $1;`
    return db.query(sql, [seminar_id]).then(res => res.rows[0])
}

function getSeminarByUserId(user_id) {
    let sql = `
    SELECT * FROM chiro_seminars WHERE user_id = $1;`
    return db.query(sql, [user_id]).then(res => res.rows)
}

function getUpdates(seminar_id, user_email) {
    console.log('model get:', seminar_id, user_email)
    let sql = `
    UPDATE chiro_seminars

    SET email_list = 
        CASE
            WHEN email_list IS NULL THEN ARRAY[$2] 
            WHEN array_position(email_list, $2) IS NULL THEN email_list || ARRAY[$2]  
            ELSE email_list 
        END
    WHERE id = $1;
    `
    return db.query(sql, [seminar_id, user_email]).then(res => res.rows);
}

function deleteUpdates(seminar_id, user_email) {
    console.log('model delete:', seminar_id, user_email)
    let sql = `
    UPDATE chiro_seminars
    SET email_list = array_remove(email_list, $2)
    WHERE id = $1 AND $2 = ANY(email_list);
    `
    return db.query(sql, [seminar_id, user_email]).then(res => res.rows);
}

const Seminar = {
    createSeminar,
    updateSeminar,
    deleteSeminar,
    featureSeminar,
    getFeaturedSeminars,
    getSeminars,
    getSeminarById,
    getUpdates,
    deleteUpdates,
    getSeminarByUserId
}

module.exports = Seminar