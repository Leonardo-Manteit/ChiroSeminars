import styles from '../CreateEvent/CreateEvents.module.css';
import Nav from '../Nav/Nav.jsx';
import Footer from '../Footer/Footer.jsx';
import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

export default function EditEvent() {
    const navigate = useNavigate();
    const location = useLocation();
    const { seminar } = location.state || {};
    const [formData, setFormData] = useState(seminar);
    const image_url = seminar?.image_url ? `http://localhost:8000/${seminar.image_url}` : null; // for local testing
    const [previewImage, setPreviewImage] = useState(image_url); // Initial image preview
    // Topic selection state
    const [selectedTopics, setSelectedTopics] = useState(seminar.topics || []);

    // Function to toggle topic selection
    function toggleTopic(topic) {
        setSelectedTopics((prevTopics) =>
            prevTopics.includes(topic)
                ? prevTopics.filter((t) => t !== topic)
                : [...prevTopics, topic]
        );
    }

    function handleChange(e) {
        const { name, value, files, checked } = e.target;

        if (name === 'featured') {
            setFormData((prevFormData) => ({
                ...prevFormData,
                'featured': checked ? 'on' : 'off',
            }));
        } else if (name === 'image' && files.length > 0) {
            const file = files[0];
            setFormData((prevFormData) => ({
                ...prevFormData,
                image: file
            }));
            setPreviewImage(URL.createObjectURL(file));
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

        Object.entries(formData).forEach(([key, value]) => {
            newFormData.append(key, value);
        });

        // Append topics
        newFormData.append('topics', JSON.stringify(selectedTopics));

        if (!formData.image_url) {
            newFormData.append('image_url', seminar.image_url);
        }

        if (!formData.featured) {
            newFormData.append('featured', seminar.featured);
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

    // List of available topics
    const availableTopics = ['Adjustment Technique', 'Communication', 'General Chiropractic',
        'Neurology', 'Nutrition', 'Paediatric', 'Practice Growth', 'Pregnancy', 'Sports/Soft Tissue', 'Other' ];

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
                        <input type="email" name="contact" placeholder="Email" value={formData.contact} onChange={handleChange} required />
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
  
                    {/* Topic selection section */}
                    <section>
                        <label>Select Topics</label>
                        <div className={styles.topicsContainer}>
                            {availableTopics.map((topic) => (
                                <div
                                    key={topic}
                                    className={`${styles.topicItem} ${selectedTopics.includes(topic) ? styles.selected : ''}`}
                                    onClick={() => toggleTopic(topic)}
                                >
                                    {topic}
                                </div>
                            ))}
                        </div>
                    </section>

                    <section>
                        <label>Feature</label>
                        <div>Would you like to feature this seminar?</div>
                        <input 
                            checked={formData.featured === 'on'} 
                            type="checkbox" 
                            name="featured" 
                            className='check_box' 
                            onChange={handleChange}
                        />
                    </section>

                    <section>
                        <button type="submit">Update</button>
                    </section>
                </form>
            </div>
            <Footer />
        </>
    );
}
