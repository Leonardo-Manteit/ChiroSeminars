import Nav from "../Nav/Nav";
import Footer from "../Footer/Footer"
import { getSeminarById } from "../../utils/seminar_api";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import EditBtn from "../EditBtn/EditBtn";

export default function DisplaySeminar() {
    const navigate = useNavigate();
    const {id} = useParams()
    const [seminar, setSeminar] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        getSeminarById(id)
            .then(res => setSeminar(res))
            .then(() => setLoading(false))
            .catch(err => console.error('Direct fetch error:', err));
    }, []);
    
    if (loading) {
        return <p className="events" id="events">Loading selected seminar...</p>;
    }

    function navSeminars() {
        navigate(`/Seminars`);
    }

    const image_url = seminar?.image_url ? `https://chiroseminarhub-australia.onrender.com/${seminar.image}` : null;   //for deployed version
    // const image_url = seminar?.image_url ? `http://localhost:8000/${seminar.image_url}` : null;                 //for local testing

    return (
        <>
        <Nav />
        {seminar ? (
            <>
            <h2 style={{color: 'red'}}>{seminar.title}</h2>
                <div key={seminar.id}>
                    <p><strong>Organizer:</strong> {seminar.organizer}</p>
                    <p><strong>Date:</strong> {seminar.date}</p>
                    <p><strong>Location:</strong> {seminar.location}</p>
                    <p><strong>Description:</strong> {seminar.location}<span dangerouslySetInnerHTML={{ __html: seminar.description }} /></p>
                    <p><strong>Price:</strong> {seminar.price}</p>
                    <p><strong>Contact:</strong> {seminar.contact}</p>
                    {image_url && <img src={image_url} style={{height: '100px', width: '100px'}}alt={`Image for ${seminar.title}`} />}

                </div>
            </>
        ) : (
            <p>No seminars available.</p>
        )}
        <EditBtn seminar={seminar}/>
        <button onClick={() => navSeminars()}>Go back to Seminar List</button>
        <Footer />
    </>
    )
}