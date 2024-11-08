import { useState, useEffect } from "react";
import { getSeminars } from "../../utils/seminar_api"
import styles from '../Featured/Featured.module.css'
import ShortDisplaySeminar from "../ShortDisplaySeminar/ShortDisplaySeminar";
import Nav from "../Nav/Nav";
import Footer from "../Footer/Footer";

export default function Favourites({user, favourites}) {
    const [favSems, setFavSems] = useState()
    const [loading, setLoading] = useState(true)
    
    useEffect(() => {
        getSeminars()
        .then(res => setFavSems(res.filter(sem => favourites.includes(String(sem.id)))))
        .then(() => setLoading(false))
        .catch(err => console.error('Direct fetch error:', err));
    }, []);
    if (loading) {
        return (
        <>
        <Nav />
            <p className="events" id="events">Loading favourite seminars...</p>;
        <Footer />
        </>)
    }
    
    return (
    <>
    <Nav />
    <section className="events" id="events">
        <p>Favourite Events</p>
        <section className={styles.display}>
        {favSems.length > 0 ? (
            <>
                {favSems.map(seminar => ( <ShortDisplaySeminar key={seminar.id} seminar={seminar} user={user} favourites={favourites} setFavourites={setFavSems}/>))}
            </>
            ) : (
                <p>No Favourite seminars.</p>
                )}
        </section>
    </section>
    <Footer />
    </>
    )
}