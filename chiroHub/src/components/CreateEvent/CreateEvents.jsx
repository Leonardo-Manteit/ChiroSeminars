import styles from './CreateEvents.module.css'
import { saveSeminar } from '../../models/seminar_router.js'

export default function Create() {

    function handleSubmit(e) {
        e.preventDefault()

        const formData = {
            title: e.target.title.value,
            organizer: e.target.organizer.value,
            date: e.target.date.value,
            location: e.target.location.value,
            description: e.target.description.value,
            price: e.target.price.value,
            contact: e.target.contact.value
        };

        saveSeminar(formData.title, formData.organizer, formData.date, formData.location, formData.description, formData.price, formData.contact)      
        
    }


    return (
    <section className={styles.createEvent}>
        
        <h3>Create Seminar</h3>

        <form className={styles.createForm} onSubmit={handleSubmit}>

        <label>Seminar Title</label>
        <input type="text" name="title"
        required />

        <label>Organizer Name</label>
        <input type="text" name="organizer"
        required />

        <label>Date and Time</label>
        <input type="datetime-local" name="date"
        required />

        <label>Location</label>
        <input type="text" name="location"
        required />

        <label>Description</label>
        <textarea name="description"/>

        <label>Price</label>
        <input type="number" name="price"
        required />

        <label>Contact</label>
        <input type="email" name="contact"
        required />

        <br />
        <button type='submit'>Submit</button>

        </form>







    </section>
    )
}