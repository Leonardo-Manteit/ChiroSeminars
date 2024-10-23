require('dotenv').config()
const express = require('express')
const router = express.Router()
const Seminar = require('../models/seminars')
const multer = require('multer');
const path = require('path');


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


// router.get('/api/createSeminar/:title/:organizer/:date/:location/:description/:price/:contact/:img', (req,res) => {
//     const [title, organizer, date, location, description, price, contact, img] = [req.params.title, req.params.organizer, req.params.date, req.params.location, req.params.description, req.params.price, req.params.contact, req.params.img]
//     return Seminar.createSeminar(title, organizer, date, location, description, price, contact, img)
// })

// router.post('/api/update/:id/:title/:organizer/:date/:location/:description/:price/:contact/:img', (req,res) => {
//     const [title, organizer, date, location, description, price, contact, img, id] = [req.params.title, req.params.organizer, req.params.date, req.params.location, req.params.description, req.params.price, req.params.contact, req.params.img, req.params.id]
//     return Seminar.updateSeminar(id, title, organizer, date, location, description, price, contact, img)
// })

router.post('/api/seminar', upload.single('image'), async (req,res) => {
    try {
        const { title, organizer, date, location, description, price, contact } = req.body
        const image = req.file ? req.file.path : null
        const feature = req.body.feature === 'on' ? 1 : 0
        console.log('Received Data:', req.body);
        console.log('Uploaded Image:', req.file);
        // req.file.path is the path to the unique image
        const newSeminar = await Seminar.createSeminar(title, organizer, date, location, description, price, contact, image, feature)
        res.status(201).json({message: 'Seminar created', seminar: newSeminar })
        
    } catch(error) {
        console.log('router.post error: ', error);
        res.status(500).json({error: 'Failed to create seminar.'})
    }  
})

router.delete('/api/delete/:id', (req,res) => {
    return Seminar.deleteSeminar(req.params.id)
})

router.get('/api/feature/:id/:featured', (req,res) => {
    return Seminar.featureSeminar(req.params.featured, req.params.id)
    .then(seminars => res.status(200).json(seminars))
})

router.get('/api/featured/', (req,res) => {
    return Seminar.getFeaturedSeminars()
    .then(seminars => res.status(200).json(seminars))
})

router.get('/api/seminars/:id/', (req,res) => {
    Seminar.getSeminarById(req.params.id)
    .then(seminars => res.status(200).json(seminars))
})

router.get('/api/seminars/', (req,res) => {
    Seminar.getSeminars()
    .then(seminars => res.status(200).json(seminars))
})

module.exports = router