import styles from './ShortDisplaySeminar.module.css';
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import EditBtn from "../EditBtn/EditBtn";
import DeleteBtn from "../DeleteBtn/DeleteBtn";
import FavouritesBtn from "../FavourtiesBtn/FavouritesBtn";
import FavouritesRemoveBtn from "../FavouritesRemoveBtn/FavouritesRemoveBtn";

export default function ShortDisplaySeminar({ seminar, user, favourites, setFavourites, previousLocation }) {
    const navigate = useNavigate();
    const [deleted, setDeleted] = useState('');
    const image_url = seminar?.image_url ? `https://chiroseminarhub-australia.onrender.com/${seminar.image_url}` : null;
    const [image, setImage] = useState(image_url);

    function handleNavigate(id) {
        navigate(`/DisplaySeminar/${id}`, { state: { user, favourites, previousLocation } });
    }

    const [isFavourite, setIsFavourite] = useState(favourites?.includes(String(seminar.id)));

    return (
        <div 
            key={seminar.id} 
            className={`${styles.container} ${deleted ? styles.hidden : ''}`}
            style={{ backgroundImage: `url(${image})` }}
        >
            <h3 className={styles.title}>{seminar.title}</h3>
            <p className={styles.text}><strong>Date:</strong> {seminar.date}</p>
            <p className={styles.text}><strong>Location:</strong> {seminar.location}</p>
            <p className={styles.text}><strong>Price:</strong> {seminar.price}</p>
            <button onClick={() => handleNavigate(seminar.id)}>Visit Seminar</button>
            <DeleteBtn setDeleted={setDeleted} user={user} seminar={seminar} />
            {isFavourite 
                ? <FavouritesRemoveBtn seminar_id={seminar.id} user={user} setIsFavourite={setIsFavourite} favourites={favourites} setFavourites={setFavourites} />
                : user ? <FavouritesBtn seminar_id={seminar.id} user={user} setIsFavourite={setIsFavourite} favourites={favourites} setFavourites={setFavourites} /> : null
            }
            <EditBtn seminar={seminar} user={user} />
        </div>
    );
}
