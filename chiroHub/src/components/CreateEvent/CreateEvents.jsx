import styles from './CreateEvents.module.css'
import Nav from '../Nav/Nav.jsx'
// import { saveSeminar } from '../../models/seminar_router.js'

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

        // saveSeminar(formData.title, formData.organizer, formData.date, formData.location, formData.description, formData.price, formData.contact)      
        
    }


    return (
        <>
        <Nav />

        <section className={styles.createEvent}>
        
        <h3>Create Seminar</h3>

        <form className={styles.createForm} onSubmit={handleSubmit}>

        <section className={styles.sections-parent}>
            <label>Seminar Title</label>
            <input type="text" name="title"
            required />
        </section>
        <section>
            <label>Organizer Name</label>
            <input type="text" name="organizer"
            required />
        </section>
        <section>
            <label>Date and Time</label>
            <input type="datetime-local" name="date"
            required />
        </section>
        <section>
            <label>Location</label>
            <input type="text" name="location"
            required />
        </section>
        <section>
        <label>Price</label>
            <input type="number" name="price"
            required />
        </section>
        <section>
            <label>Contact</label>
            <input type="email" name="contact"
            required />
        </section>
        <section>
            <label>Description</label>
            <textarea name="description"/>
        </section>
        <section>
        <img src="https://fakeimg.pl/600x400" alt="" />
        </section>
        <section>
            <button type='submit'>Submit</button>
        </section>
        </form>







    </section>
    </>
    )
}