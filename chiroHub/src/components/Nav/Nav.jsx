export default function Nav() {
    return (
    <header>
        <div className="logo">
            <h1><a href="/ChiroSeminars/">ChiroOceaniaHub</a></h1>
        </div>
        <nav>
            <ul>
                <li><a href="/ChiroSeminars/">Home</a></li>
                <li><a href="/ChiroSeminars/Seminars">Seminars</a></li>
                {/* <li><a href="#">Online Courses</a></li> */}
                {/* <li><a href="#">Coaching</a></li> */}
                <li><a href="/ChiroSeminars/AboutUs">About Us</a></li>
                <li><a href="/ChiroSeminars/Contact">Contact</a></li>
            </ul>
        </nav>
    </header> 
    )
}