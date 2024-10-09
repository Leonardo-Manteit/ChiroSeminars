const db = require('../db')

function updateSeminar(title, organizer, date, location, description, price, contact) {

    let sql = `ALTER TABLE seminars   
    (organizer, date, location, description, price, contact)
    VALUES 
    ($1, $2, $3, $4, $5, $6)
    WHERE title = $7
    RETURNING *;
    `;

    return db.query(sql, [organizer, date, location, description, price, contact, title])
            .then(res => console.log(res.rows))
}

function createSeminar(title, organizer, date, location, description, price, contact) {

    let sql = `INSERT INTO seminars   
    (title, organizer, date, location, description, price, contact)
    VALUES 
    ($1, $2, $3, $4, $5, $6, $7)
    RETURNING *;
    `;

    return db.query(sql, [title, organizer, date, location, description, price, contact])
            .then(res => console.log(res.rows))

}

function deleteSeminar(seminar_id) {
    let sql = 'DELETE FROM seminars WHERE id = $1;'
    return db.query(sql, [seminar_id]).then(res => console.log(res.rows[0]))
}

function featureSeminar(featured, seminar_id) {
    let sql = `ALTER TABLE seminars
    (featured) VALUES ($1)
    WHERE id = $2
    RETURNING *;`
    return db.query(sql, [featured, seminar_id]).then(res => console.log(res.rows))
}


const Seminar = {
    createSeminar,
    updateSeminar,
    deleteSeminar,
    featureSeminar
}

module.exports = Seminar