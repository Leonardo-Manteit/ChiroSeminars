import Footer from "../Footer/Footer";
import Nav from "../Nav/Nav";
import React, {useState, useEffect} from "react";
import styles from './Contact.module.css'
import emailjs from '@emailjs/browser';

export default function Contact() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [status, setStatus] = useState(null)

    // let secrets = import.meta.env // local host
    // const [serviceId, templateId, publicKey] = [secrets.VITE_REACT_SERVICE_ID, secrets.VITE_REACT_YOUR_TEMPLATE_ID, secrets.VITE_REACT_PUBLIC_KEY]

    // ----- deployed version -----
    const [serviceId, templateId, publicKey] = [process.env.VITE_REACT_SERVICE_ID, process.env.VITE_REACT_YOUR_TEMPLATE_ID, process.env.VITE_REACT_PUBLIC_KEY]
    console.log(serviceId, templateId, publicKey)

    useEffect(() => {
        const userEmail = localStorage.getItem('email');
        if (userEmail) {
            setFormData({ ...formData, email: userEmail });
        }
        }, []);

        const handleSubmit = (e) => {
            e.preventDefault();
            const templateParams = {
                name,
                email,
                message,
                to_name: 'ChiroOceaniaHub'
              }
            emailjs.send(serviceId, templateId, templateParams, publicKey)
            .then((response) => {
              console.log('Message sent successfully!', response.status, response.text);
              setStatus('Message sent successfully!');
              alert(status);
              // Clear the form
              setName('');
              setEmail('');
              setMessage('');
            })
            .catch((err) => {
              console.error('Failed to send message:', err);
              setStatus('Failed to send message. Please try again later.');
              alert(status);
            });
          };




    return (
        <>
        <Nav />

        <h2>Feel free to message us</h2>

        <p>Responses can take up to 24 to 48 hours during the working week and will be addressed as soon as possible</p>

        <p>If your message is Urgent, please begin the message with "URGENT"</p>


        <form className={styles.form} onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Your Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            />
          <input
            type="email"
            placeholder="Your Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            />
          <textarea
            placeholder="Your Message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            required
            ></textarea>
          <button type="submit">Send Message</button>
        </form>


        <img src="https://fakeimg.pl/1000x250" alt="about-us-banner" style={{width: '1000px'}}/>

        <Footer />
        </>
    )
}