// get users armies
require('dotenv').config()
const express = require('express')
const router = express.Router()
const db = require('../db')
const User = require('../models/Users')

router.get('/api/user/:email', (req,res) => {
    return User.findByEmail(req.params.email)
})

module.exports = router