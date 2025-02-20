import styles from './ShortDisplaySeminar.module.css';
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import EditBtn from "../EditBtn/EditBtn";
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
            onClick={() => handleNavigate(seminar.id)}
            >
        <section
            className={`${styles.section} ${deleted ? styles.hidden : ''}`}
            style={{ backgroundImage: `url(${image})` }}
            >
            <div className={styles.cardHeader}>    
                {seminar.topics.map((topic, id) => {
                    return (
                        <div className={styles.topic}>{topic}</div>
                    )
                })}
                {isFavourite 
                    ? <FavouritesRemoveBtn seminar_id={seminar.id} user={user} setIsFavourite={setIsFavourite} favourites={favourites} setFavourites={setFavourites} />
                    : user ? <FavouritesBtn seminar_id={seminar.id} user={user} setIsFavourite={setIsFavourite} favourites={favourites} setFavourites={setFavourites} /> : null
                }
            </div>
            <div className={styles.text}>
                <p><strong>Start date:</strong> {seminar.date}</p>
                <p><strong>Location:</strong> {seminar.location}</p>
                {/* <p className={styles.text}><strong>Price:</strong> {seminar.price}</p> */}
            </div>
 
            <EditBtn seminar={seminar} user={user} />
        </section>
            <div className={styles.title} >{seminar.title}</div>
        </div>
    );
}
