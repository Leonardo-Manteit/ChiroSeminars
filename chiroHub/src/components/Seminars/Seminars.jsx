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
    const [displayByFavourite, setDisplayByFavourite] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const seminarsPerPage = 6;

    useEffect(() => {
        getSeminars()
        .then(res => {
         const sortSeminars = res.sort((a,b) => new Date(a.date) - new Date(b.date))
            setSeminars(sortSeminars)
        })
        .then(() => setLoading(false))
        .catch(err => console.error('Direct fetch error:', err));
    }, []);

    const [user, setUser] = useState(getUserFromLocalStorage());
    const [favourites, setFavourites] = useState(user?.favouriteSeminarIds)
    const [favourites2, setFavourites2] = useState(favourites)
    
    const handleNextPage = () => {
        setCurrentPage(prevPage => prevPage + 1);
    };

    const handlePreviousPage = () => {
        setCurrentPage(prevPage => (prevPage > 1 ? prevPage - 1 : prevPage));
    };

    const filteredSeminars = seminars
        .filter(seminar => !selectedTopic || seminar?.topics?.includes(selectedTopic))
        .filter(seminar => !searchedSeminar || seminar?.title?.includes(searchedSeminar))
        .filter(seminar => !displayByFavourite || favourites2?.includes(String(seminar.id)));

    const indexOfFirstSeminar = (currentPage - 1) * seminarsPerPage;
    const indexOfLastSeminar = currentPage * seminarsPerPage;
    const currentSeminars = filteredSeminars.slice(indexOfFirstSeminar, indexOfLastSeminar);

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

            <div className={styles.pagination}>
                <div>Page: {currentPage}</div>
                {currentPage > 1 ? (
                    <><button onClick={handlePreviousPage}>Previous Page</button><button style={{backgroundColor: 'grey'}}>Next Page</button></>
                
                )
                : (   
                    <><button style={{backgroundColor: 'grey'}}>Previous Page</button><button onClick={handleNextPage}>Next Page</button></>
                )}
            </div>

            {displayByFavourite 
                ? <button onClick={() => setDisplayByFavourite(!displayByFavourite)}>Display All</button>
                : user ? <button onClick={() => setDisplayByFavourite(!displayByFavourite)}>Display your favourites</button> : null
            }
            <h2>Seminar List</h2>
            <section className={styles.display}>
                {currentSeminars.length > 0 ? (
                    currentSeminars.map(seminar => (
                        <ShortDisplaySeminar
                            setFavourites={setFavourites2}
                            key={seminar.id}
                            seminar={seminar}
                            user={user}
                            favourites={favourites2}
                        />
                    ))
                ) : (
                    <p className="events" id="events">No Seminars.</p>
                )}
            </section>
            <Footer />
        </>
    );
}
