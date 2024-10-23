const db = require('../db')

function updateSeminar(title, organizer, date, location, description, price, contact, id) {

    let sql = `ALTER TABLE seminars   
    (title organizer, date, location, description, price, contact)
    VALUES 
    ($1, $2, $3, $4, $5, $6, $7)
    WHERE id = $8
    RETURNING *;
    `;

    return db.query(sql, [organizer, date, location, description, price, contact, title, id])
            .then(res => res.rows)
}

function createSeminar(title, organizer, date, location, description, price, contact, image) {

    let sql = `INSERT INTO seminars   
    (title, organizer, date, location, description, price, contact, image_url)
    VALUES 
    ($1, $2, $3, $4, $5, $6, $7, $8)
    RETURNING *;
    `;
    return db.query(sql, [title, organizer, date, location, description, price, contact, image])
            .then(res => res.rows)

}

function deleteSeminar(seminar_id) {
    let sql = 'DELETE FROM seminars WHERE id = $1;'
    return db.query(sql, [seminar_id]).then(res => res.rows[0])
}

function featureSeminar(featured, seminar_id) {
    let sql = `ALTER TABLE seminars
    (featured) VALUES ($1)
    WHERE id = $2
    RETURNING *;`
    return db.query(sql, [featured, seminar_id]).then(res => res.rows)
}

function getFeaturedSeminars() {
    let sql = `SELECT id, title, date, location, price FROM seminars WHERE featured = '1';`
    return db.query(sql).then(res => res.rows)
}

function getSeminars() {
    let sql = `SELECT id, title, date, location, price FROM seminars;`
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