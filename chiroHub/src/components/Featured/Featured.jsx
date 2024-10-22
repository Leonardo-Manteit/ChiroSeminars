import { useState, useEffect } from "react";
import { getFeatured } from "../../utils/seminar_api"
import styles from './Featured.module.css'



export default function Featured() {
    const [featured, setFeatured] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        getFeatured()
            .then(res => setFeatured(res))
            .then(() => setLoading(false))
            .catch(err => console.error('Direct fetch error:', err));
    }, []);

    if (loading) {
        return <p className="events" id="events">Loading featured seminars...</p>;
    }

    return (
        <section className="events" id="events">
        <p>Featured Events</p>
        <secton className={styles.display}>
        {featured.length > 0 ? (
            <ul>
                    {featured.map(seminar => (
                        <div className={styles.featured}key={seminar.id}>
                            <h4 style={{color: 'red'}}>{seminar.title}</h4>
                            <p><strong>Date:</strong> {seminar.date}</p>
                            <p><strong>Location:</strong> {seminar.location}</p>
                            <p><strong>Price:</strong> {seminar.price}</p>
                        </div>
                    ))}
                </ul>
            ) : (
                <p>No Featured seminars.</p>
                )}
        </secton>
    </section>
    )
}