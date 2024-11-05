require('dotenv').config()
const express = require('express')
const router = express.Router()
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const User = require('../models/Users')
const saltRounds = 10;

router.post('/chiro/signUp', async (req, res, next) => {
    const { email, username, password, role } = req.body
    let salt = await bcrypt.genSalt(saltRounds)
    let hash = await bcrypt.hash(password, salt)
    if (email.trim() !== '' || password !== '') {
        return await User.createUser(email.trim(), username, hash, role).catch((err) => {
            next(err)
        })
    } else {
        throw new Error('Email or password missing')
    }
})

router.post('/chiro/login',  async (req, res, next) => {
    try {
        const { email, username, password, role } = req.body

        let user = await User.findByEmail(email)

        if (!user) {
            let err = new Error('incorrect username or passowrd')
            err.status = 400
            throw err
        }

        let match = await bcrypt.compare(password, user.password_digest)
        if (!match) {
            let err = new Error('incorrect username or passowrd')
            err.status = 400
            throw err
        }

        //generate a token
        const token = jwt.sign (
            { id: user.id, email: user.email, username: user.username, role: user.role},
            'cakepudding', 
            { expiresIn: '24h'} 
        )
        res.json({ token: token })  
    } catch (err) {
        next(err)
    }

})

module.exports = router