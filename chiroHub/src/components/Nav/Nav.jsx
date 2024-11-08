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
    return (
        <>      
            <header>
                <div className={styles.logo}>
                    <h1><Link to="/">ChiroOceaniaHub</Link></h1>
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
                        {user ? <li><Link to="/Favourites">Favourites</Link></li> : null }
                        {user ? <li><Link to="/Dashboard/:id">Dashboard</Link></li> : null }
                        {user ? (
                            <button onClick={handleLogout}>Logout</button>
                        ) : (
                            <li><Link to="/Login">Login</Link></li>
                        )}
                    </ul>
                </nav>
            </header> 
        </>
    );
}
