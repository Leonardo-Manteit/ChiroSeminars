import { useState, useEffect } from "react";
import { getFeatured } from "../../utils/seminar_api"
import styles from './Featured.module.css'
import ShortDisplaySeminar from "../ShortDisplaySeminar/ShortDisplaySeminar";



export default function Featured() {
    const [featured, setFeatured] = useState()
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
    console.log(featured)
    return (
    <section className="events" id="events">
        <p>Featured Events</p>
        <secton className={styles.display}>
        {featured.length > 0 ? (
            <>
                {featured.map(seminar => ( <ShortDisplaySeminar seminar={seminar} />))}
            </>
            ) : (
                <p>No Featured seminars.</p>
                )}
        </secton>
    </section>
    )
}