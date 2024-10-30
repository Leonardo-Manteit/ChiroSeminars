import styles from './CreateEvents.module.css';
import Nav from '../Nav/Nav.jsx';
import Footer from '../Footer/Footer.jsx';
import { useNavigate } from "react-router-dom";
import { useState } from 'react';

export default function Create() {
    const [imagePreview, setImagePreview] = useState(null); // State for image preview
    const [selectedTopics, setSelectedTopics] = useState([]); // State for selected topics
    const navigate = useNavigate();

    const availableTopics = [
        'Adjustment Technique',
        'Communication',
        'General Chiropractic',
        'Neurology',
        'Nutrition',
        'Other',
        'Paediatric',
        'Practice Growth',
        'Pregnancy',
        'Sports/Soft Tissue'
    ];

    function toggleTopic(topic) {
        setSelectedTopics((prevTopics) =>
            prevTopics.includes(topic)
                ? prevTopics.filter((t) => t !== topic)
                : [...prevTopics, topic]
        );
    }

    async function handleSubmit(e) {
        e.preventDefault();
        console.log('Submitting form with selected topics:', selectedTopics); // Debugging line

        const formData = new FormData(e.target);
        formData.append('topics', JSON.stringify(selectedTopics)); // Append selected topics as JSON
        console.log('FormData to be sent:', [...formData]); // Debugging line

        try {
            const response = await fetch('/api/seminar', {
                method: 'POST',
                body: formData,
            });
            if (response.ok) {
                e.target.reset();
                setImagePreview(null); // Reset image preview after submission
                setSelectedTopics([]); // Clear selected topics
                console.log('formData SENT');
            } else {
                console.error('Failed to send formData:', response.statusText); // Error handling
            }
        } catch (error) {
            console.error('formData could NOT send, error: ', error); // Error handling
        }

        navigate(`/ChiroSeminars/Seminars`);
    }

    function handleImageChange(e) {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result); // Set the image preview URL
            };
            reader.readAsDataURL(file); // Read the file as a data URL
        } else {
            setImagePreview(null); // Reset if no file is selected
        }
    }

    return (
        <>
            <Nav />
            <div className={styles.createEvent}>
                <h3>Create Seminar</h3>
                <form className={styles.createForm} onSubmit={handleSubmit}>
                    <section className={styles.sectionsParent}>
                        <label>Seminar Title</label>
                        <input type="text" name="title" placeholder="Enter seminar title" required />
                    </section>
                    <section>
                        <label>Organizer Name</label>
                        <input type="text" name="organizer" placeholder="Enter organizer name" required />
                    </section>
                    <section>
                        <label>Date and Time</label>
                        <input type="datetime-local" name="date" required />
                    </section>
                    <section>
                        <label>Location</label>
                        <input type="text" name="location" placeholder="Address or URL" required />
                    </section>
                    <section>
                        <label>Price ($AUD)</label>
                        <input type="number" name="price" placeholder="Enter price" required />
                    </section>
                    <section>
                        <label>Contact</label>
                        <input type="email" name="contact" placeholder="Email" required />
                    </section>
                    <section>
                        <label>Description</label>
                        <textarea name="description" placeholder="Provide a brief description" />
                    </section>
                    <section>
                        <label>Image</label>
                        <input 
                            type="file" 
                            accept="image/*" 
                            name="image" 
                            onChange={handleImageChange} // Handle image change
                        />
                    </section>
                    {imagePreview && (
                        <section>
                            <h4>Image Preview:</h4>
                            <img src={imagePreview} alt="Image Preview" className={styles.imagePreview} style={{ width: '100px', height: 'auto', marginBottom: '10px' }}/>
                        </section>
                    )}

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
                        <input type="checkbox" name="featured" className='check_box' />
                    </section>

                    <section>
                        <button type='submit'>Submit</button>
                    </section>
                </form>
            </div>
            <Footer />
        </>
    );
}
