import { useNavigate } from "react-router-dom";
import { deleteSeminar } from "../../utils/seminar_api";
import { useState } from "react";
import EditBtn from "../EditBtn/EditBtn";

export default function ShortDisplaySeminar({ seminar }) {
    const navigate = useNavigate();
    const [deleted, setDeleted] = useState('');
    // const image_url = seminar?.image_url ? `https://chiroseminarhub-australia.onrender.com/${seminar.image}` : null;   //for deployed version
    const image_url = seminar?.image_url ? `http://localhost:8000/${seminar.image_url}` : null;                 //for local testing
    const [image, setImage] = useState(image_url);

    function handleNavigate(id) {
        navigate(`/ChiroSeminars/DisplaySeminar/${id}`);
    }

    function handleDelete(id) {
        setDeleted('none');
        deleteSeminar(id);
    }

    return (
        <div 
            key={seminar.id} 
            style={{
                display: deleted ? 'none' : 'block',
                backgroundImage: `url(${image})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                width: '40%',          // or specify the width you want
                height: 'auto'          // specify height as needed
            }}
        >
            <h4 style={{ color: 'red' }}>{seminar.title}</h4>
            <p><strong>Date:</strong> {seminar.date}</p>
            <p><strong>Location:</strong> {seminar.location}</p>
            <p><strong>Price:</strong> {seminar.price}</p>
            <button onClick={() => handleNavigate(seminar.id)}>Visit Seminar</button>
            <button onClick={() => handleDelete(seminar.id)}>Delete Seminar</button>
            <EditBtn seminar={seminar} />
        </div>
    );
}
