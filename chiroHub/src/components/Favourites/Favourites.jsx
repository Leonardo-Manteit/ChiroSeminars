import { useState, useEffect } from "react";
import { getSeminars } from "../../utils/seminar_api"
import styles from '../Featured/Featured.module.css'
import ShortDisplaySeminar from "../ShortDisplaySeminar/ShortDisplaySeminar";
import Nav from "../Nav/Nav";
import Footer from "../Footer/Footer";
import { getUserFromLocalStorage } from '../../utils/auth_service';


export default function Favourites() {
    const [user, setUser] = useState(getUserFromLocalStorage());
    const [favourites, setFavourites] = useState(user?.favouriteSeminarIds)
    const [favSems, setFavSems] = useState()
    const [loading, setLoading] = useState(true)
    const [displayUpcoming, setDisplayUpcoming ] = useState(false)


    useEffect(() => {
        getSeminars()
        .then(res => setFavSems(res.filter(sem => favourites?.includes(String(sem.id)))))
        .then(() => setLoading(false))
        .catch(err => console.error('Direct fetch error:', err));
    }, [favourites]);

    if (loading) {
        return (
        <>
        <Nav />
            <p className="events" id="events">Loading favourite seminars...</p>;
        <Footer />
        </>)
    }

    function filterUpcomingEvents () {
        const today = new Date()
        const nextWeek = new Date()
        nextWeek.setDate(today.getDate() + 7)

        return favSems.filter(seminar => {
            const seminarDate = new Date(seminar.date)
            return seminarDate >= today && seminarDate <= nextWeek
        })
    }

    const seminarsToDisplay = displayUpcoming ? filterUpcomingEvents() : favSems
    
    return (
    <>
    <Nav />
        <section className="events" id="events">

            <button onClick={() => setDisplayUpcoming(!displayUpcoming)}>
                {displayUpcoming ? "Show All" : "Show Upcoming"}
            </button>
            
            <p>Favourite Events</p>

            <section className={styles.display}>
                {seminarsToDisplay.length > 0 ? (
                    <>
                        {seminarsToDisplay.map(seminar => ( <ShortDisplaySeminar previousLocation={'/Favourites'} key={seminar.id} seminar={seminar} user={user} favourites={favourites} setFavourites={setFavourites}/>))}
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