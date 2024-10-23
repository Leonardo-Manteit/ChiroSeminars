import Nav from "../Nav/Nav";
import Footer from "../Footer/Footer"
import { getSeminarById } from "../../utils/seminar_api";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import FeatureBtn from "../FeatureBtn/FeatureBtn";

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
    console.log(seminar)
    if (loading) {
        return <p className="events" id="events">Loading selected seminar...</p>;
    }

    function navSeminars() {
        navigate(`/ChiroSeminars/Seminars`);
    }

    function navUpdate() {
        navigate(`/ChiroSeminars/`);
    }

    // const image_url = seminar?.image_url ? `https://chiroseminarhub-australia.onrender.com/${seminar.image}` : null;   //for deployed version
    const image_url = seminar?.image_url ? `http://localhost:8000/${seminar.image_url}` : null;                 //for local testing

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
                    <p dangerouslySetInnerHTML={{ __html: seminar.description }} />
                    <p><strong>Price:</strong> {seminar.price}</p>
                    {image_url && <img src={image_url} alt={`Image for ${seminar.title}`} />}

                </div>
            </>
        ) : (
            <p>No seminars available.</p>
        )}
        <button onClick={() => navUpdate()}>Update Seminar</button>
        <button onClick={() => navSeminars()}>Go back to Seminar List</button>
        <Footer />
    </>
    )
}