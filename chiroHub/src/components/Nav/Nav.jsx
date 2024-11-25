import { useState } from 'react';
import { Link } from 'react-router-dom';
import { getUserFromLocalStorage } from '../../utils/auth_service.js';
import { useNavigate } from "react-router-dom";
import { useLocation } from 'react-router-dom';
import styles from './Nav.module.css'

export default function Nav() {
    const navigate = useNavigate()
    const currentLocation = useLocation();
    const [user, setUser] = useState(getUserFromLocalStorage());

    function handleLogout() {
        setUser(null);
        localStorage.removeItem('token');
        currentLocation.pathname === '/' ? location.reload() : navigate('/')
    }
    
    const profilePic = user?.profilePic 
    ? `https://chiroseminarhub-australia.onrender.com/${user.profilePic}` 
    : "https://chiroseminarhub-australia.onrender.com/uploads/blank-profile-pic.png";
    // const profilePic = user?.profilePic 
    // ? `http://localhost:8000/${user.profilePic}` 
    // : `http://localhost:8000/uploads/blank-profile-pic.png`; // local host


    return (
        <div className={styles.navWrapper}>      
            <header>
                <div className={styles.logo}>
                    <h1>
                        <Link to="/">
                            <span style= {{ fontSize: '125%'}}>C</span>hiro
                            <span style= {{ fontSize: '125%'}}>O</span>ceania
                            <span style= {{ fontSize: '125%'}}>Hub</span>
                            <span style={{ color: 'goldenrod' }}>●</span>
                        </Link>
                    </h1>
                </div>
                <nav>
                    <ul>
                        <li><Link to="/">Home</Link></li>
                        <li><Link to="/Seminars">Seminars</Link></li>
                        {/* <li><Link to="#">Online Courses</Link></li> */}
                        {/* <li><Link to="#">Coaching</Link></li> */}
                        <li><Link to="/AboutUs">About Us</Link></li>
                        <li><Link to="/Contact">Contact</Link></li>
                        {user ? <li><Link to="/CreateEvent">Create Event</Link></li> : null }
                        {user ? 
                        <li className={styles.Dashboard}><Link to="/Dashboard/:id"><img src={profilePic} alt="" /></Link>
                            <div className={styles.dropDown}>
                                <ul>
                                    <li><Link to="/Dashboard/:id">Dashboard</Link></li>
                                    <li><Link to="/Favourites">Favourites</Link></li> 
                                    <li><Link to="/Settings">Settings</Link></li> 
                                    <li>light / dark mode</li>
                                    <li onClick={handleLogout}>Logout</li>
                                </ul>
                            </div>
                        </li> 
                        : <li><Link to="/Login">Login</Link></li> }
                    </ul>
                </nav>
            </header> 
            {user 
            ? user?.is_verified 
                ? null : <div className={styles.not_verified}>{user?.username}: you're email is not verified. Click <Link to="/verify-email">HERE</Link> to verify</div>
            : null}
        </div>
    );
}
