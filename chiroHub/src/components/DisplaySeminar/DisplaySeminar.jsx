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

export default function DisplaySeminar() {
    const navigate = useNavigate();
    const {id} = useParams()
    const location = useLocation();
    const user = location.state?.user;
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
            <p className="events" id="events">Loading selected seminar...</p>;
            <Footer />
            </>
        )
    }

    function navSeminars() {
        navigate(`/Seminars`);
    }

    //for deployed version
    // const image_url = seminar?.image_url ? `https://chiroseminarhub-australia.onrender.com/${seminar.image_url}` : null; 

    // reset cache version
    // const image_url = seminar?.image_url ? `https://chiroseminarhub-australia.onrender.com/${seminar.image_url}?nocache=${Date.now()}` : null;
  
    
    //for local testing
    const image_url = seminar?.image_url ? `http://localhost:8000/${seminar.image_url}` : null;                
    
    // console.log('Image URL:', image_url);

    return (
        <>
        <Nav />
        <button style={{fontWeight: "bolder"}} onClick={() => navSeminars()}>← </button>

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
        <EditBtn seminar={seminar} user={user}/>
        <DeleteBtn seminar={seminar} user={user} setDeleted={navSeminars} />
        {isFavourite 
            ? <FavouritesRemoveBtn seminar_id={seminar.id} user={user} setIsFavourite={setIsFavourite} favourites={favourites} setFavourites={setFavourites}/>
            : user ? <FavouritesBtn seminar_id={seminar.id} user={user} setIsFavourite={setIsFavourite} favourites={favourites} setFavourites={setFavourites}/> : null
        }
        <GetUpdates />
        <Footer />
    </>
    )
}