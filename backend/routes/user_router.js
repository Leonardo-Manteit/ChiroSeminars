require('dotenv').config();
const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const db = require('../db');
const User = require('../models/Users');

// Configure multer for file storage
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/'); // Make sure the 'uploads' directory exists
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname)); // Generate unique filename
    }
});
const upload = multer({ storage });

// Route to handle profile photo upload
router.post('/chiro/user/uploadProfilePhoto', upload.single('profilePhoto'), async (req, res) => {
    try {
        const filePath = req.file.path;
        const email = req.body.email;

        // Update user's profile_pic_url in the database
        await User.updateProfilePic(email, filePath);

        res.json({ imageUrl: filePath });
    } catch (err) {
        res.status(500).json({ message: 'Image upload failed', error: err });
    }
});

// Existing route
router.get('/chiro/user/:email', (req, res) => {
    return User.findByEmail(req.params.email)
        .then(user => res.json(user))
        .catch(err => res.status(500).json({ message: 'User not found', error: err }));
});

router.post('/chiro/favourite/:favSem_id/:user_id', (req, res) => {
    const {favSem_id, user_id} = req.params
    return User.addFavouriteSeminar(favSem_id, user_id)
        .then(user => res.json(user))
        .catch(err => res.status(500).json({ message: 'User not found', error: err }));
});

router.delete('/chiro/favourite/:favSem_id/:user_id', (req, res) => {
    const {favSem_id, user_id} = req.params
    return User.removeFavouriteSeminar(favSem_id, user_id)
        .then(user => res.json(user))
        .catch(err => res.status(500).json({ message: 'User not found', error: err }));
});

router.delete('/chiro/user/delete/:user_id', (req, res) => {
    const {user_id} = req.params
    return User.deleteUser(user_id)
        .then(user => res.json(user))
        .catch(err => res.status(500).json({ message: 'User could not be deleted', error: err }));
});


module.exports = router;
