import Footer from "../Footer/Footer";
import Nav from "../Nav/Nav";
import React, {useState, useEffect} from "react";
import styles from './Contact.module.css'

export default function Contact() {
    const [formData, setFormData] = useState({
        email: '',
        subject: '',
        message: ''
    });

    async function handleSubmit(e) {
        e.preventDefault();
        
        try {
            const response = await fetch(`/chiro/contact-us/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            alert('Form submitted successfully')
            setFormData({
                email: '',
                subject: '',
                message: ''
            });
        } catch (error) {
            console.error('There was an error submitting the form:', error);
            alert('Error sending Email')
        }
    }

    function handleChange(e) {
        setFormData({...formData, [e.target.name] : e.target.value})
    }

    return (
        <>
        <Nav />

        <h2>Feel free to message us</h2>

        <p>Responses can take up to 24 to 48 hours during the working week and will be addressed as soon as possible</p>

        <p>If your message is Urgent, please begin the message with "URGENT"</p>


        <form onSubmit={handleSubmit} className={styles.form}>

            <label>Contact email : </label>
            <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Jane.Smith@example.com"required/>
        
            <label>Subject : </label>
            <input type="text" name="subject" value={formData.subject} onChange={handleChange} placeholder="Subject of email" />
        
            <label>Message : </label>
            <textarea name="message" value={formData.message} onChange={handleChange} placeholder="Hi, can you help with..."required></textarea>

            <button type="submit">Submit</button>

        </form>


        <img src="https://fakeimg.pl/1000x250" alt="about-us-banner" style={{width: '1000px'}}/>

        <Footer />
        </>
    )
}