import { useState } from 'react';
import { getUserFromLocalStorage } from '../../utils/auth_service.js'

export default function Nav() {
    const [user, setUser] = useState(getUserFromLocalStorage())
    function handleLogout() {
        setUser(null)
        localStorage.removeItem('token')
    }
    return (
        <>      
            <header>
                <div className="logo">
                    <h1><a href="/">ChiroOceaniaHub</a></h1>
                </div>
                <nav>
                    <ul>
                        <li><a href="/">Home</a></li>
                        <li><a href="/Seminars">Seminars</a></li>
                        {/* <li><a href="#">Online Courses</a></li> */}
                        {/* <li><a href="#">Coaching</a></li> */}
                        <li><a href="/AboutUs">About Us</a></li>
                        <li><a href="/Contact">Contact</a></li>
                        <li><a href="/CreateEvent">Create Event</a></li>
                        {user ? <button onClick={handleLogout}>Logout</button> : <li><a href="/Login">Login</a></li>}
                    </ul>
                </nav>
            </header> 
        </>
    )
}