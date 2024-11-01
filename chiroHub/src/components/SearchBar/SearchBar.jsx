
import { Link } from 'react-router-dom';

export default function SearchBar() {
    return (
    <section className="SearchBar">
        <section className="hero">
            <h2>Empowering Chiropractors in Oceania</h2>
            <p>Find the best seminars, webinars, and coaching all in one place</p>
            <button><Link to="/Seminars">Explore Seminars</Link></button>
        </section>
    </section>
    )
}