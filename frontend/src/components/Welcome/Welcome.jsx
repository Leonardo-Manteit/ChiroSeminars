import { Link } from 'react-router-dom';
// import SearchBar from '../SearchBar/SearchBar';
import styles from './Welcome.module.css'
import TopicList from '../TopicList/TopicList';

export default function Welcome() {
    return (
        <div className={styles.container}>
            
            <section >
                <h2>Empowering Chiropractors in Oceania</h2>
                <p>Find the best seminars, webinars, and coaching all in one place</p>
                <button ><Link to="/Seminars">Explore All Seminars</Link></button>
            </section>    
            
            <TopicList />
            
        </div>
    )
}
