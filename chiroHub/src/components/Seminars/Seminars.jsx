import Nav from "../Nav/Nav";
import Footer from "../Footer/Footer";
import { useNavigate } from "react-router-dom";


export default function Seminars() {
    const navigate = useNavigate()
    
    function handleNavigate(e) {
        e.preventDefault()
        navigate('/ChiroSeminars/CreateEvent');
    }

    return (
    <>
    <Nav />
    <p>map through seminars table in db</p>
    <button onClick={handleNavigate}>CLick here to create a new event</button>
    <Footer />


    </>
    )
}