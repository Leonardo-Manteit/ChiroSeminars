import { useState } from 'react';
import { Link } from 'react-router-dom';
import { getUserFromLocalStorage } from '../../utils/auth_service.js';

export default function Nav() {
    const [user, setUser] = useState(getUserFromLocalStorage());
    
    function handleLogout() {
        setUser(null);
        localStorage.removeItem('token');
    }
    
    return (
        <>      
            <header>
                <div className="logo">
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
                        <li><Link to="/CreateEvent">Create Event</Link></li>
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
