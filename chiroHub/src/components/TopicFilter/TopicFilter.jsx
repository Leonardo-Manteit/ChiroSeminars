import React, { useState } from 'react';

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
        <div className="filter-container">
            <h4>Select a Topic to Search</h4>
            <p>We offer a wide variety of topics/subjects.</p>
            <div className="topics-container">
                {topics.map((topic) => (
                    <div
                        key={topic}
                        className={`topic-item ${selectedTopic === topic ? 'selected' : ''}`}
                        onClick={() => handleTopicClick(topic)}
                    >
                        {topic}
                    </div>
                ))}
            </div>
        </div>
    );
}
