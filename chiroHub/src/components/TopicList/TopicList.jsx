import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './TopicList.module.css'

export default function TopicList() {
    const navigate = useNavigate();
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

    const [selectedTopic, setSelectedTopic] = useState(null);

    useEffect(() => {
        if (selectedTopic) {
            console.log('Searching seminars for topic:', selectedTopic);
            navigate('/seminars', { state: { topic: selectedTopic } });
        }
    }, [selectedTopic, navigate]);

    function handleTopicClick(topic) {
        setSelectedTopic(prevSelected => (prevSelected === topic ? null : topic));
    }

    return (
        <div className={styles.filterContainer}>
            <h2>Select a Topic to Search</h2>
            <h4>We offer a wide variety of topics/subjects.</h4>
            <div className={styles.topicsContainer}>
                {topics.map((topic) => (
                    <button
                        key={topic}
                        className={`${styles.topicItem} ${selectedTopic === topic ? styles.selected : ''}`}
                        onClick={() => handleTopicClick(topic)}
                    >
                        {topic}
                    </button>
                ))}
            </div>
        </div>
    );
}


