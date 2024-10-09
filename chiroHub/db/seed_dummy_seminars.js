// const { Client } = require('pg');
// require('dotenv').config();


// const client = new Client({
//   connectionString: process.env.DATABASE_URL,
// });

// async function seedSeminars() {
//   try {
//     await client.connect();

//     const sql = `
//         INSERT INTO seminars (title, username_list, featured)
//         VALUES
//         ('Chiropractic Basics', '{"user1", "user2"}', NULL),
//         ('Advanced Spine Seminar', '{"user3", "user4"}', NULL),
//         ('Therapeutic Techniques', '{"user5", "user6"}', NULL),
//         ('Sports Chiropractic', '{"user7", "user8"}', NULL),
//         ('Pediatric Chiropractic Care', '{"user9", "user10"}', NULL),
//         ('Spinal Adjustments Masterclass', '{"user11", "user12"}', NULL),
//         RETURNING *;
//         `;


//     const res = await client.query(sql); 
//     console.log('Inserted into seminars:', res.rows);

//   } catch (err) {
//     console.error('Error inserting into seminars:', err);
//   } finally {
//     await client.end();
//   }
// }


// seedSeminars();
