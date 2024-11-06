import { useEffect, useState } from 'react';
import styles from './SearchBar.module.css';
import { useNavigate } from 'react-router-dom';

export default function SearchBar({ handleSearch }) {
    const navigate = useNavigate();
    const [search, setSearch] = useState('');

    function defaultSearch() {
        navigate('/seminars', { state: { search: search } });
    }

    function effectiveSearchHandler(e) {
        e.preventDefault();
        if (handleSearch) {
            handleSearch(search)
        } else {
            defaultSearch()
        }
    };

    return (
        <section className={styles.SearchBar}>
            <form onSubmit={effectiveSearchHandler}>
                <input
                    type="text"
                    placeholder="Search for a specific seminar"
                    onChange={(e) => setSearch(e.target.value)}
                    value={search}
                />
                <button>Search</button>
            </form>
        </section>
    );
}
