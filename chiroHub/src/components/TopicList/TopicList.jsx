import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
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
        <div className="filter-container">
            <h4>Select a Topic to Search</h4>
            <p>We offer a wide variety of topics/subjects.</p>
            <div className="topics-container">
                {topics.map((topic) => (
                    <button
                        key={topic}
                        className={`topic-item ${selectedTopic === topic ? 'selected' : ''}`}
                        onClick={() => handleTopicClick(topic)}
                    >
                        {topic}
                    </button>
                ))}
            </div>
        </div>
    );
}
