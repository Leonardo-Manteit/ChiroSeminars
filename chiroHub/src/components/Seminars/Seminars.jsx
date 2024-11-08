import Nav from "../Nav/Nav";
import Footer from "../Footer/Footer";
import { getSeminars } from "../../utils/seminar_api";
import { useEffect, useState } from "react";
import ShortDisplaySeminar from "../ShortDisplaySeminar/ShortDisplaySeminar";
import TopicFilter from "../TopicFilter/TopicFilter";
import styles from '../Featured/Featured.module.css';
import { useLocation } from "react-router-dom";
import SearchBar from "../SearchBar/SearchBar";
import { getUserFromLocalStorage } from "../../utils/auth_service";

export default function Seminars({ topicFromHome = null }) {
    const location = useLocation();
    const topic = location.state?.topic;
    const searched = location.state?.search;
    const [seminars, setSeminars] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedTopic, setSelectedTopic] = useState(topic ? topic : topicFromHome);
    const [searchedSeminar, setSearchedSeminar] = useState(searched ? searched : '');
    const [displayByFavourite, setDisplayByFavourite] = useState(false)
    
    useEffect(() => {
        getSeminars()
        .then(res => setSeminars(res))
        .then(() => setLoading(false))
        .catch(err => console.error('Direct fetch error:', err));
    }, []);
    const [user, setUser] = useState(getUserFromLocalStorage());
    const [favourites, setFavourites] = useState(user?.favouriteSeminarIds)
    const [favourites2, setFavourites2] = useState(favourites)
    
    if (loading) {
        return (
            <>
                <Nav />
                <SearchBar handleSearch={setSearchedSeminar} />
                <TopicFilter selectedTopic={selectedTopic} setSelectedTopic={setSelectedTopic} />
                <p className="events" id="events">Loading seminars...</p>
                <Footer />
            </>
        );
    }

    return (
        <>
            <Nav />
            <SearchBar handleSearch={setSearchedSeminar} />
            <TopicFilter selectedTopic={selectedTopic} setSelectedTopic={setSelectedTopic} />
            {displayByFavourite 
                ? <button onClick={()=>setDisplayByFavourite(!displayByFavourite)}>Display All</button>
                : user ? <button onClick={()=>setDisplayByFavourite(!displayByFavourite)}>Display your faviourites</button> : null
            }
            <h2>Seminar List</h2>
            <section className={styles.display}>
                {seminars.length > 0 ? (
                    seminars
                        .filter(seminar => !selectedTopic || seminar?.topics?.includes(selectedTopic))
                        .filter(seminar => !searchedSeminar || seminar?.title?.includes(searchedSeminar))
                        .filter(seminar => !displayByFavourite || favourites2?.includes(String(seminar.id)))
                        .map(seminar => <ShortDisplaySeminar setFavourites={setFavourites2} key={seminar.id} seminar={seminar} user={user} favourites={favourites2}/>)
                ) : (
                    <p className="events" id="events">No Seminars.</p>
                )}
            </section>
            <Footer />
        </>
    );
}
