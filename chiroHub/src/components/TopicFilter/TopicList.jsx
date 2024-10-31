import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function topicFilter() {
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

    function handleTopicClick(topic) {
        setSelectedTopic(prevSelected => (prevSelected === topic ? null : topic));
        searchByTopic()
    }

    function searchByTopic() {
        if (selectedTopic) {
            console.log('Searching seminars for topic:', selectedTopic);
            navigate('/seminars', { state: { topic: selectedTopic } });
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
