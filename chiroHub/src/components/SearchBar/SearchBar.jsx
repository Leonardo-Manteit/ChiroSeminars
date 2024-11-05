
import { Link } from 'react-router-dom';
import styles from './SearchBar.module.css'
export default function SearchBar() {
    return (
    <section className={styles.SearchBar}>
        <form action="">
            <input type="text" placeholder='search for a seminar'/>
        </form>
    </section>
    )
}