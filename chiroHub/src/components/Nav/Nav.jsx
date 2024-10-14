<<<<<<< Updated upstream

=======
>>>>>>> Stashed changes
import { useState } from 'react';
import { getUserFromLocalStorage } from '../../utils/auth_service.js'

export default function Nav() {
    const [user, setUser] = useState(getUserFromLocalStorage())
<<<<<<< Updated upstream
=======
    console.log(user)
>>>>>>> Stashed changes
    function handleLogout() {
        setUser(null)
        localStorage.removeItem('token')
    }
    return (
    <>    
        
    <header>
        <div className="logo">
            <h1><a href="/ChiroSeminars/">ChiroOceaniaHub</a></h1>
        </div>
        <nav>
            <ul>
                <li><a href="/ChiroSeminars/">Home</a></li>
                <li><a href="/ChiroSeminars/Seminars">Seminars</a></li>
                {user ? <button onClick={handleLogout}>Logout</button> : <li><a href="/ChiroSeminars/Login">Login</a></li>}
                {/* <li><a href="#">Online Courses</a></li> */}
                {/* <li><a href="#">Coaching</a></li> */}
                <li><a href="/ChiroSeminars/AboutUs">About Us</a></li>
                <li><a href="/ChiroSeminars/Contact">Contact</a></li>
            </ul>
        </nav>
    </header> 
    </>
)
}