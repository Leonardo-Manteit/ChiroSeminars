import { useState, useEffect } from "react";
import { getFeatured } from "../../utils/seminar_api"
import styles from './Featured.module.css'
import ShortDisplaySeminar from "../ShortDisplaySeminar/ShortDisplaySeminar";



export default function Featured({user, favourites}) {
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
    
    return (
    <section className={styles.events} id="events">
        <h2>Featured Events</h2>
        <section className={styles.display}>
        {featured.length > 0 ? (
            <>
                {featured.map(seminar => ( 
                    <ShortDisplaySeminar 
                        previousLocation={'/'} 
                        key={seminar.id} 
                        seminar={seminar} 
                        user={user} 
                        favourites={favourites} 
                        setFavourites={() => null
                        }
                    />
                ))}
            </>
            ) : (
                <p>No Featured seminars.</p>
                )}
        </section>
    </section>
    )
}

