import styles from '../CreateEvent/CreateEvents.module.css'
import Nav from '../Nav/Nav.jsx'
import Footer from '../Footer/Footer.jsx';
import FeatureBtn from '../FeatureBtn/FeatureBtn.jsx';
import React from 'react';
import { useLocation } from 'react-router-dom';
import { useState } from 'react';

export default function EditEvent() {
    const location = useLocation();
    const { seminar } = location.state || {};
    const [formData, setFormData] = useState(seminar)

    function handleChange(e) {
        const { name, value } = e.target;
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value
        }));
    }

    async function handleSubmit (e) {
        e.preventDefault()
        const newFormData = new FormData(e.target);
        try {
            const response = await fetch(`/api/seminar/update/${seminar.id}`, {
                method: 'POST',
                body: newFormData,
            })
            if (response.ok) {
                e.target.reset()
                console.log('formData SENT');
            }
        } catch (error) {
            console.log('formData could NOT send, error: ', error);
            
        }
    }

    return (
        <>
        <Nav />

        <div className={styles.createEvent}>
        
            <h3>Create Seminar</h3>

            <form className={styles.createForm} onSubmit={handleSubmit} >

            <section className={styles.sections-parent}>
                <label>Seminar Title</label>
                <input type="text" name="title" value={formData.title} onChange={handleChange}
                required />
            </section>
            <section>
                <label>Organizer Name</label>
                <input type="text" name="organizer" value={formData.organizer} onChange={handleChange}
                required />
            </section>
            <section>
                <label>Date and Time</label>
                <input type="datetime-local" name="date" value={formData.date} onChange={handleChange}
                required />
            </section>
            <section>
                <label>Location</label> 
                <input type="text" name="location" placeholder='Address or URL' value={formData.location} onChange={handleChange}
                required />
            </section>
            <section>
            <label>Price ($AUD)</label>
                <input type="number" name="price" value={formData.price} onChange={handleChange}
                required />
            </section>
            <section>
                <label>Contact</label>
                <input type="email" name="contact" placeholder="Phone or Email" value={formData.contact} onChange={handleChange}
                required />
            </section>
            <section>
                <label>Description</label>
                <textarea name="description" value={formData.description} onChange={handleChange}/>
            </section>
            <section>
                <label>Image</label>
                <input type="file" accept="image/*" name="image" value={formData.image} onChange={handleChange}/>
            </section>
            <FeatureBtn preFeatured={formData.featured ? true : false}/>
            <section>
                <button type='submit'>Update</button>
            </section>
            </form>

        </div>

        <Footer />
    </>
    )
}