import Nav from "../Nav/Nav";
import Footer from "../Footer/Footer";
import { getSeminars } from "../../utils/seminar_api";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Seminars() {
    const navigate = useNavigate();
    const [seminars, setSeminars] = useState([]);  // Start with an empty array
    const [loading, setLoading] = useState(true);  // Track loading state
    
    useEffect(() => {
        getSeminars()
            .then(res => setSeminars(res))
            .then(() => setLoading(false))
            .catch(err => console.error('Direct fetch error:', err));
    }, []);
    
    if (loading) {
        return (<p>Loading seminars...</p>);
    }

    function handleNavigate(id) {
        navigate(`/ChiroSeminars/DisplaySeminar/${id}`);
    }
    
    return (
        <>
            <Nav />
            <h2>Seminar List</h2>
            {seminars.length > 0 ? 
                seminars.map(seminar => (
                <div key={seminar.id}>
                    <h4 style={{color: 'red'}}>{seminar.title}</h4>
                    <p><strong>Date:</strong> {seminar.date}</p>
                    <p><strong>Location:</strong> {seminar.location}</p>
                    <p><strong>Price:</strong> {seminar.price}</p>
                    <button onClick={() => handleNavigate(seminar.id)}>Visit Seminar</button>
                </div>))
                 : (
                <p>No seminars available.</p>
            )}
            <Footer />;
        </>
        )
}