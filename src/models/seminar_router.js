import db from "../../db/index.js";

export function saveSeminar(title, organizer, date, location, description, price, contact) {

    let sql = `INSERT INTO chiroseminars   
    (title, organizer, date, location, description, price, contact)
    VALUES 
    ($1, $2, $3, $4, $5, $6, $7)
    RETURNING *
    `;

    return db.query(sql, [title, organizer, date, location, description, price, contact])
            .then(res => console.log(res.rows))
}

