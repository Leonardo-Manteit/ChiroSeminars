const db = require('../db')

function createSeminar(title, organizer, date, location, description, price, contact, image, featured, topics) {
    
    let sql = `INSERT INTO seminars   
    (title, organizer, date, location, description, price, contact, image_url, featured, topics)
    VALUES 
    ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
    RETURNING *;
    `
    console.log(sql, [title, organizer, date, location, description, price, contact, image, featured, topics])
    return db.query(sql, [title, organizer, date, location, description, price, contact, image, featured, topics])
    .then(res => res.rows)
}

function updateSeminar(title, organizer, date, location, description, price, contact, image, featured, topics, id) {
    let sql = `UPDATE seminars
    SET 
        title = $1,
        organizer = $2,
        date = $3,
        location = $4,
        description = $5,
        price = $6,
        contact = $7,
        image_url = $8,
        featured = $9,
        topics = $10
    WHERE id = $11
    RETURNING *;
    `
    return db.query(sql, [title, organizer, date, location, description, price, contact, image, featured, topics, id])
            .then(res => res.rows)
}

function deleteSeminar(seminar_id) {
    let sql = 'DELETE FROM seminars WHERE id = $1 RETURNING *;'
    return db.query(sql, [seminar_id]).then(res => res.rows[0])
}

function featureSeminar(featured, seminar_id) {
    let sql = `UPDATE seminars
    SET 
    featured = $1
    WHERE id = $2
    RETURNING *;`
    return db.query(sql, [featured, seminar_id]).then(res => res.rows)
}

function getFeaturedSeminars() {
    let sql = `SELECT * FROM seminars WHERE featured = 'on';`
    return db.query(sql).then(res => res.rows)
}

function getSeminars() {
    let sql = `SELECT * FROM seminars;`
    return db.query(sql).then(res => res.rows)
}

function getSeminarById(seminar_id) {
    let sql = `
    SELECT * FROM seminars WHERE id = $1;`
    return db.query(sql, [seminar_id]).then(res => res.rows[0])
}

const Seminar = {
    createSeminar,
    updateSeminar,
    deleteSeminar,
    featureSeminar,
    getFeaturedSeminars,
    getSeminars,
    getSeminarById
}

module.exports = Seminar