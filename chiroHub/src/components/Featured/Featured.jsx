import { useState, useEffect } from "react";
import { getFeatured } from "../../utils/seminar_api"

export default function Featured() {
    const [featured, setFeatured] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        getFeatured()
            .then(data => setFeatured(data))
            .then(() => setLoading(false))
            .catch(err => console.error('Direct fetch error:', err));
    }, []);
    console.log(featured)

    if (loading) {
        return <p>Loading featured seminars...</p>;
    }

    return (
    <section className="events" id="events">
        <h3>Featured Events</h3>
        {featured.length > 0 ? (
                <ul>
                    {featured.map(seminar => (
                        <li key={seminar.id}>
                            <h2 style={{color: 'red'}}>{seminar.title}</h2>
                            <p><strong>Organizer:</strong> {seminar.organizer}</p>
                            <p><strong>Date:</strong> {seminar.date}</p>
                            <p><strong>Location:</strong> {seminar.location}</p>
                            <p dangerouslySetInnerHTML={{ __html: seminar.description }} />
                            <p><strong>Price:</strong> {seminar.price}</p>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No Featured seminars.</p>
            )}
    </section>
    )
}