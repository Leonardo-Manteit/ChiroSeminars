import React, { useState } from 'react';
import styles from './TopicFilter.module.css'

export default function topicFilter({selectedTopic, setSelectedTopic}) {
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


    function handleTopicClick(topic) {
        setSelectedTopic(prevSelected => (prevSelected === topic ? null : topic));
        searchByTopic()
    }

    function searchByTopic() {
        if (selectedTopic) {
            console.log('Searching seminars for topic:', selectedTopic);
            // Add your search logic here
        } else {
            console.log('No topic selected');
        }
    }

    return (
        <div className={styles.filterContainer}>
            <h4>Select a Topic to Search</h4>
            <p>We offer a wide variety of topics/subjects.</p>
            <div className={styles.topicContainer}>
                {topics.map((topic) => (
                    <div
                        key={topic}
                        className={`${styles.topicItem} ${selectedTopic === topic ? styles.selected : ''}`}
                        onClick={() => handleTopicClick(topic)}
                    >
                        {topic}
                    </div>
                ))}
            </div>
        </div>
    );
}
