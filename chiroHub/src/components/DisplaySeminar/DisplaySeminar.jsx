import Nav from "../Nav/Nav";
import Footer from "../Footer/Footer"
import { getSeminarById } from "../../utils/seminar_api";
import { useState, useEffect } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import EditBtn from "../EditBtn/EditBtn";
import DeleteBtn from "../DeleteBtn/DeleteBtn";
import GetUpdates from "../GetUpdates/GetUpdates";
import FavouritesBtn from "../FavourtiesBtn/FavouritesBtn";
import FavouritesRemoveBtn from "../FavouritesRemoveBtn/FavouritesRemoveBtn";
import styles from './DisplaySeminar.module.css'

export default function DisplaySeminar() {
    const navigate = useNavigate();
    const {id} = useParams()
    const location = useLocation();
    const user = location.state?.user;
    const previousLocation = location.state?.previousLocation
    const [favourites, setFavourites] = useState(location.state?.favourites)
    const [seminar, setSeminar] = useState(null)
    const [loading, setLoading] = useState(true)
    const [isFavourite, setIsFavourite] = useState(favourites?.includes(id))
    useEffect(() => {
        getSeminarById(id)
        .then(res => setSeminar(res))
        .then(() => setLoading(false))
        .catch(err => console.error('Direct fetch error:', err));
    }, []);
    if (loading) {
        return (
            <>
            <Nav />
            <p>Loading selected seminar...</p>;
            <Footer />
            </>
        )
    }

    function navSeminars() {
        navigate(previousLocation);
    }

    //for deployed version
    const image_url = seminar?.image_url ? `https://chiroseminarhub-australia.onrender.com/${seminar.image_url}` : null; 

    // reset cache version
    // const image_url = seminar?.image_url ? `https://chiroseminarhub-australia.onrender.com/${seminar.image_url}?nocache=${Date.now()}` : null;
  
    //for local testing
    // const image_url = seminar?.image_url ? `http://localhost:8000/${seminar.image_url}` : null;     

    return (
        <>
        <Nav />
        <div className={styles.buttons}>
            <button style={{fontWeight: "bolder"}} onClick={() => navSeminars()}>← </button>
            {user 
            ? <>
                <EditBtn seminar={seminar} user={user}/>
                <DeleteBtn seminar={seminar} user={user} setDeleted={navSeminars} />
                <GetUpdates seminar={seminar} user={user} />
            </>
            : null
            }
            {isFavourite 
                ? <FavouritesRemoveBtn seminar_id={seminar.id} user={user} setIsFavourite={setIsFavourite} favourites={favourites} setFavourites={setFavourites}/>
                : user ? <FavouritesBtn seminar_id={seminar.id} user={user} setIsFavourite={setIsFavourite} favourites={favourites} setFavourites={setFavourites}/> : null
            }
        </div>
        <br />
        <br />
        <div className={styles.container} key={seminar.id}> 
            <h2 className={styles.title}>{seminar.title}</h2>
            <hr />
            {image_url && <img src={image_url} className={styles.seminarImg} alt={`Image for ${seminar.title}`} />}
            <hr />
            <div className={styles.info_header}>
                <p><strong>Organizer:</strong> {seminar.organizer}</p>
                <p><strong>Location:</strong> {seminar.location}</p>
                <p><strong>Date:</strong> {seminar.date}</p>
            </div>
            <hr />
            <p className={styles.pricing}>{seminar.location}<span dangerouslySetInnerHTML={{ __html: seminar.description }} /></p>
            <div className={styles.info_header}>
                <p><strong>Contact:</strong> {seminar.contact}</p>
                <p className={styles.pricing}><strong>Price:</strong> {seminar.price}</p>
            </div>
        </div>
        <br />
        <Footer />
    </>
    )
}