const { Pool } = require('pg');
require('dotenv').config();

const db = new Pool({
  connectionString: process.env.DATABASE_URL,
});

module.exports = {
  query: (text, params, callback) => {
    return db.query(text, params, callback);
  },
};

module.exports = db 

// import { Pool } from 'pg';
// const db_url = import.meta.env.VITE_DATABASE_URL

// const db = new Pool({
//   connectionString: db_url,
//   ssl: {
//     rejectUnauthorized: false,  // Render requires SSL to be enabled.
//   },
// });

// export default db
