require('dotenv').config()
const pg = require('pg')
const pool = new pg.Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false, // Set to true if you have a valid SSL certificate
  },
})

module.exports = pool