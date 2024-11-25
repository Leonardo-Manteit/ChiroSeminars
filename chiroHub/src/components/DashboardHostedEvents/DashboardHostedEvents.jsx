import { useEffect, useState } from "react";
import { getUserHostedSeminars } from "../../utils/seminar_api";
import ShortDisplaySeminar from "../ShortDisplaySeminar/ShortDisplaySeminar";

export default function DashboardHostedEvents({user}) {
    const [hostedEvents, setHostedEvents] = useState([])
    const [loading, setLoading] = useState(true);
    const [favourites, setFavourites] = useState()
    
    useEffect(()=> {
        setFavourites(user?.favouriteSeminarIds)
        getUserHostedSeminars(user.id)
        .then((res) => {
            console.log(res)
            const sortSeminars = res.sort((a, b) => new Date(a.date) - new Date(b.date));
            setHostedEvents(sortSeminars);
        })
        .then(() => setLoading(false))
        .catch(err => console.error('Direct fetch error:', err));
    }, [])

    return (
    <section className="events">
        <h3>Hosted Events</h3> 
        {loading ? <>loading...</> 
        : hostedEvents ? hostedEvents.map((seminar) => <ShortDisplaySeminar previousLocation={'/Dashboard'} key={seminar.id} seminar={seminar} user={user} favourites={favourites} setFavourites={() => null}/>)
        : <p>No hosted events</p>
        } 
    </section>
    );
}