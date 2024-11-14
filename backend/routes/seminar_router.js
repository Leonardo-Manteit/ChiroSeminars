require('dotenv').config()
const express = require('express')
const router = express.Router()
const Seminar = require('../models/seminars')
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/'); 
    },
    filename: (req, file, cb) => {
        const uniqueName = `${Date.now()}-${file.originalname}`;
        cb(null, uniqueName); 
    }
});

const upload = multer({ storage: storage });

router.use('/uploads', express.static(path.join(__dirname, '../uploads')));

router.post('/chiro/seminar', upload.single('image'), async (req,res) => {
    try {
        const { user_id, title, organizer, date, location, description, price, contact, featured, topics } = req.body
        const image = req.file ? req.file.path : null
        const topicsArray = JSON.parse(topics)
        console.log('Received Data:', req.body);
        console.log('Uploaded Image:', req.file);
        // req.file.path is the path to the unique image
        const newSeminar = await Seminar.createSeminar(user_id, title, organizer, date, location, description, price, contact, image, featured, topicsArray)
        res.status(201).json({message: 'Seminar created', seminar: newSeminar })
        
    } catch(error) {
        console.log('router.post error: ', error);
        res.status(500).json({error: 'Failed to create seminar.'})
    }  
})

router.post('/chiro/seminar/update/:id', upload.single('image'), async (req,res) => {
    try {
        const { title, organizer, date, location, description, price, contact, featured, topics } = req.body
        const id = req.params.id
        const image = req.file ? req.file.path : req.body.image_url
        console.log(topics)
        const topicsArray = JSON.parse(topics[1])
        console.log('Received Data:', req.body);
        console.log('Uploaded Image:', req.file);
        // req.file.path is the path to the unique image
        const newSeminar = await Seminar.updateSeminar(title, organizer, date, location, description, price, contact, image, featured, topicsArray, id)
        res.status(201).json({message: 'Seminar created', seminar: newSeminar })
        
    } catch(error) {
        console.log('router.post error: ', error);
        res.status(500).json({error: 'Failed to create seminar.'})
    }  
})

router.delete('/chiro/delete/:id', async (req, res) => {
    const seminarId = req.params.id; 

    try {
     
        const seminar = await Seminar.getSeminarById(seminarId);

        if (seminar && seminar.image_url) {
           
            fs.unlink(seminar.image_url, (err) => {
                if (err) {
                    console.log('Failed to delete image:', err.message);
                } else {
                    console.log('Image deleted:', seminar.image_url);
                }
            });
        }
        
        const deletedSeminar = await Seminar.deleteSeminar(seminarId);
        
        if (deletedSeminar) {
            res.status(200).json({ message: 'Seminar and associated image deleted successfully' });
        } else {
            res.status(404).json({ error: 'Seminar not found' });
        }
    } catch (error) {
        console.log('Delete error:', error);
        res.status(500).json({ error: 'Failed to delete seminar.' });
    }
});

router.get('/chiro/feature/:id/:featured', (req,res) => {
    return Seminar.featureSeminar(req.params.featured, req.params.id)
    .then(seminars => res.status(200).json(seminars))
})

router.get('/chiro/featured/', (req,res) => {
    return Seminar.getFeaturedSeminars()
    .then(seminars => res.status(200).json(seminars))
})

router.get('/chiro/seminars/:id/', (req,res) => {
    Seminar.getSeminarById(req.params.id)
    .then(seminars => res.status(200).json(seminars))
})

router.get('/chiro/seminars/', (req,res) => {
    Seminar.getSeminars()
    .then(seminars => res.status(200).json(seminars))
})

module.exports = router