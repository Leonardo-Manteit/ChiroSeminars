import { useState } from 'react';
import styles from './SearchBar.module.css';
import { useNavigate } from 'react-router-dom';
import { IoSearchOutline  } from "react-icons/io5"

export default function SearchBar({ handleSearch, placeholder = "", id, className }) {
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
        <section className={`${styles.SearchBar} ${className || ""}`} id={id}>
            <form onSubmit={effectiveSearchHandler}>
                <input
                    type="text"
                    placeholder={placeholder}
                    onChange={(e) => setSearch(e.target.value)}
                    value={search}
                />
                <button><IoSearchOutline /></button>
            </form>
        </section>
    );
}
