import styles from '../CreateEvent/CreateEvents.module.css';
import Nav from '../Nav/Nav.jsx';
import Footer from '../Footer/Footer.jsx';
import FeatureBtn from '../FeatureBtn/FeatureBtn.jsx';
import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

export default function EditEvent() {
    const navigate = useNavigate();
    const location = useLocation();
    const { seminar } = location.state || {};
    const [formData, setFormData] = useState(seminar);
    const [previewImage, setPreviewImage] = useState(seminar.image_url); // Initial image preview

    function handleChange(e) {
        const { name, value, files } = e.target;
        
        // Check if it's the file input
        if (name === 'image' && files.length > 0) {
            const file = files[0];
            setFormData((prevFormData) => ({
                ...prevFormData,
                image: file // Store the new file
            }));
            setPreviewImage(URL.createObjectURL(file)); // Create preview URL for new image
        } else {
            setFormData((prevFormData) => ({
                ...prevFormData,
                [name]: value
            }));
        }
    }

    async function handleSubmit(e) {
        e.preventDefault();
        const newFormData = new FormData();

        // Append all fields to FormData
        Object.entries(formData).forEach(([key, value]) => {
            newFormData.append(key, value);
        });

        // If no new image is selected, append the existing image_url instead
        if (!formData.image) {
            newFormData.append('image_url', seminar.image_url);
        }

        try {
            const response = await fetch(`/api/seminar/update/${seminar.id}`, {
                method: 'POST',
                body: newFormData,
            });
            if (response.ok) {
                e.target.reset();
                console.log('formData SENT');
            }
        } catch (error) {
            console.log('formData could NOT send, error: ', error);
        }
        navigate(`/ChiroSeminars/DisplaySeminar/${seminar.id}`);

    }

    return (
        <>
            <Nav />
            <div className={styles.createEvent}>
                <h3>Edit Seminar</h3>
                <form className={styles.createForm} onSubmit={handleSubmit}>
                    <section className={styles.sectionsParent}>
                        <label>Seminar Title</label>
                        <input type="text" name="title" value={formData.title} onChange={handleChange} required />
                    </section>
                    <section>
                        <label>Organizer Name</label>
                        <input type="text" name="organizer" value={formData.organizer} onChange={handleChange} required />
                    </section>
                    <section>
                        <label>Date and Time</label>
                        <input type="datetime-local" name="date" value={formData.date} onChange={handleChange} required />
                    </section>
                    <section>
                        <label>Location</label> 
                        <input type="text" name="location" placeholder="Address or URL" value={formData.location} onChange={handleChange} required />
                    </section>
                    <section>
                        <label>Price ($AUD)</label>
                        <input type="number" name="price" value={formData.price} onChange={handleChange} required />
                    </section>
                    <section>
                        <label>Contact</label>
                        <input type="email" name="contact" placeholder="Phone or Email" value={formData.contact} onChange={handleChange} required />
                    </section>
                    <section>
                        <label>Description</label>
                        <textarea name="description" value={formData.description} onChange={handleChange} />
                    </section>
                    <section>
                        <label>Image</label>
                        {previewImage && (
                            <img src={previewImage} alt="Current Seminar" style={{ width: '100px', height: 'auto', marginBottom: '10px' }} />
                        )}
                        <input type="file" accept="image/*" name="image" onChange={handleChange} />
                    </section>
                    <FeatureBtn preFeatured={formData.featured ? true : false} />
                    <section>
                        <button type="submit">Update</button>
                    </section>
                </form>
            </div>
            <Footer />
        </>
    );
}
