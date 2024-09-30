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
