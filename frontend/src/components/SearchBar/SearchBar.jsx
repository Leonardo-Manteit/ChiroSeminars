import { useState } from 'react';
import styles from './SearchBar.module.css';
import { useNavigate } from 'react-router-dom';
import { IoSearchOutline } from "react-icons/io5"



export default function SearchBar({ handleSearch, placeholder = "", id, className }) {
    const navigate = useNavigate();
    const [search, setSearch] = useState('');
    const [selectedTopic, setSelectedTopic] = useState(null);
    const [selectedLocation, setSelectedLocation] = useState("");

    const locations = ["Remote", "Sydney", "Melbourne", "Brisbane", "Perth", "Auckland", "Wellington"];

    const topics = [
        'Adjustment Technique',
        'Communication',
        'General Chiropractic',
        'Neurology',
        'Nutrition',
        'Paediatric',
        'Practice Growth',
        'Pregnancy',
        'Sports/Soft Tissue',
        'Other'
    ];

    function defaultSearch() {
        navigate('/seminars', { state: { search: search, topic: selectedTopic, location: selectedLocation } });
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
                
                <select value={selectedTopic} onChange={(e) => setSelectedTopic(e.target.value)}>
                    <option value=""> 🏷️ </option>
                    {topics.map((topic, index) => (
                        <option key={index} value={topic}>{topic}</option>
                    ))}
                </select>

                <select value={selectedLocation} onChange={(e) => setSelectedLocation(e.target.value)}>
                    <option value=""> 📍</option>
                    {locations.map((location, index) => (
                        <option key={index} value={location}>{location}</option>
                    ))}
                </select>

                <button><IoSearchOutline /></button>
            </form>
        </section>
    );
}
