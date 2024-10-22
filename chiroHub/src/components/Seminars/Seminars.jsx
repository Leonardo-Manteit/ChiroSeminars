import Nav from "../Nav/Nav";
import Footer from "../Footer/Footer";
import { useNavigate } from "react-router-dom";
import { getSeminars } from "../../utils/seminar_api";
import { useEffect, useState } from "react";

export default function Seminars() {
    const [seminars, setSeminars] = useState([]);  // Start with an empty array
    const [loading, setLoading] = useState(true);  // Track loading state
    
    // const navigate = useNavigate();
    // function handleNavigate(e) {
    //     e.preventDefault();
    //     navigate('/ChiroSeminars/CreateEvent');
    // }

    useEffect(() => {
        getSeminars()
            .then(data => setSeminars(data))
            .then(() => setLoading(false))
            .catch(err => console.error('Direct fetch error:', err));
    }, []);

    if (loading) {
        return <p>Loading seminars...</p>;
    }

    return (
        <>
            <Nav />
            <p>Seminar List</p>
            {seminars.length > 0 ? (
                <ul>
                    {seminars.map(seminar => (
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
                <p>No seminars available.</p>
            )}
            <Footer />
        </>
    );
}
