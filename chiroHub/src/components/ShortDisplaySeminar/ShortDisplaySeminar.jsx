import { useNavigate } from "react-router-dom";
import { deleteSeminar } from "../../utils/seminar_api";
import { useState } from "react";
import EditBtn from "../EditBtn/EditBtn";
import DeleteBtn from "../DeleteBtn/DeleteBtn";
import FavouritesBtn from "../FavourtiesBtn/FavouritesBtn";
import FavouritesRemoveBtn from "../FavouritesRemoveBtn/FavouritesRemoveBtn";

export default function ShortDisplaySeminar({ seminar, user, favourites, setFavourites}) {
    const navigate = useNavigate();
    const [deleted, setDeleted] = useState('');
    // const image_url = seminar?.image_url ? `https://chiroseminarhub-australia.onrender.com/${seminar.image_url}` : null;   //for deployed version
    const image_url = seminar?.image_url ? `http://localhost:8000/${seminar.image_url}` : null;                 //for local testing
    const [image, setImage] = useState(image_url);
    function handleNavigate(id) {
        navigate(`/DisplaySeminar/${id}`, { state: { user: user, favourites: favourites } });
    }
    const [isFavourite, setIsFavourite] = useState(favourites?.includes(String(seminar.id)))
    return (
        <div 
            key={seminar.id} 
            style={{
                display: deleted ? 'none' : 'block',
                backgroundImage: `url(${image})`,
                border: 'black solid 1px',
                borderRadius: '50px',
                backgroundSize: 'cover',
                padding: '15px 50px',
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
            <DeleteBtn setDeleted={setDeleted} user={user} seminar={seminar}/>
            {isFavourite 
            ? <FavouritesRemoveBtn seminar_id={seminar.id} user={user} setIsFavourite={setIsFavourite} favourites={favourites} setFavourites={setFavourites}/>
            : user ? <FavouritesBtn seminar_id={seminar.id} user={user} setIsFavourite={setIsFavourite} favourites={favourites} setFavourites={setFavourites}/> : null
            }
            <EditBtn seminar={seminar} user={user} />
        </div>
    );
}

