import Nav from "../Nav/Nav";
import Footer from "../Footer/Footer";
import { getSeminars } from "../../utils/seminar_api";
import { useEffect, useState } from "react";
import ShortDisplaySeminar from "../ShortDisplaySeminar/ShortDisplaySeminar";
import TopicFilter from "../TopicFilter/TopicFilter";
import styles from '../Featured/Featured.module.css'
import { useLocation } from "react-router-dom";

export default function Seminars({topicFromHome=null}) {
    const location = useLocation();
    const topic = location.state?.topic;
    const [seminars, setSeminars] = useState([]);  // Start with an empty array
    const [loading, setLoading] = useState(true);  // Track loading state
    const [selectedTopic, setSelectedTopic] = useState(topic ? topic : topicFromHome);
    useEffect(() => {
        getSeminars()
            .then(res => setSeminars(res))
            .then(() => setLoading(false))
            .catch(err => console.error('Direct fetch error:', err));
    }, []);
    if (loading) {
        return (<p>Loading seminars...</p>);
    }
    return (<>
        <Nav />
        <TopicFilter selectedTopic={selectedTopic} setSelectedTopic={setSelectedTopic} />
        <h2>Seminar List</h2>
        <section className={styles.display}>
        {seminars.length > 0 ? (
            <>
                {seminars.filter(seminar => !selectedTopic || seminar?.topics?.includes(selectedTopic)).map(seminar => ( <ShortDisplaySeminar seminar={seminar} />))}
            </>
            ) : (
                <p>No Seminars.</p>
                )}
        </section>
        <Footer />;
    </>)
}