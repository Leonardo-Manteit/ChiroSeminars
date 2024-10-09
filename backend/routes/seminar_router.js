// get users armies
require('dotenv').config()
const express = require('express')
const router = express.Router()
const db = require('../db')
const User = require('../models/User')

router.get('/api/factions/psql', (req,res) => {
    return db.query('select * from factions;')
        .then(result=>result.rows).then(faction => res.status(200).json(faction))
})

router.delete('/api/delete/army/:armyId', (req,res) => {
    User.deleteArmy(req.params.armyId).then(result=>result.rows).then(faction => res.status(200).json(faction))
})

router.get('/api/user/:email', (req,res) => {
    let sql = `
    SELECT * FROM users
    WHERE email = $1;
    `
    return db.query(sql, [req.params.email]).then(result=>result.rows).then(user => res.status(200).json(user))
})