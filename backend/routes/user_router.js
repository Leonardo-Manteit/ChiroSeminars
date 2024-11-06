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

module.exports = router;
