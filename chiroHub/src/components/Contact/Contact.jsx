import Footer from "../Footer/Footer";
import Nav from "../Nav/Nav";
import React, {useState, useEffect} from "react";
import styles from './Contact.module.css'

export default function Contact() {


    const [formData, setFormData] = useState({
        name: '',
        message: '',
        subject: '',
        email: ''
    });

    useEffect(() => {
        const userEmail = localStorage.getItem('email');
        if (userEmail) {
            setFormData({ ...formData, email: userEmail });
        }
        }, []);

    function handleSubmit() {
        //
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

            <label>Name : </label>
            <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="username or email"required/>
        
            <label>Subject : </label>
            <input type="text" name="subject" value={formData.subject} onChange={handleChange} placeholder="subject" />
        
            <label>Message : </label>
            <textarea name="message" value={formData.message} onChange={handleChange} placeholder="your message"required></textarea>

            <button type="submit">Submit</button>

        </form>


        <img src="https://fakeimg.pl/1000x250" alt="about-us-banner" style={{width: '1000px'}}/>

        <Footer />
        </>
    )
}