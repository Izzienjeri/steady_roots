import React, { useState, useEffect } from 'react';
import axios from 'axios';

const MentorshipComponent = () => {
    const [mentors, setMentors] = useState([]);
    const [mentees, setMentees] = useState([]);

    useEffect(() => {
        // Fetch mentors
        axios.get('/mentor_blueprint/mentors')
            .then(response => {
                setMentors(response.data);
            })
            .catch(error => {
                console.error('Error fetching mentors:', error);
            });

        // Fetch mentees
        axios.get('/mentee_blueprint/mentees')
            .then(response => {
                setMentees(response.data);
            })
            .catch(error => {
                console.error('Error fetching mentees:', error);
            });
    }, []);

    const requestMentorship = () => {
        
        
        axios.post('/mentorship/request', {  })
            .then(response => {
                console.log('Mentorship request sent successfully:', response.data);
                
            })
            .catch(error => {
                console.error('Error sending mentorship request:', error);
                
            });
    };

    const offerMentorship = () => {
        
        axios.post('/mentorship/offer', {  })
            .then(response => {
                console.log('Mentorship offer sent successfully:', response.data);
                
            })
            .catch(error => {
                console.error('Error sending mentorship offer:', error);
                
            });
    };

    return (
        <div>
            <h2>Mentors</h2>
            <ul>
                {mentors.map(mentor => (
                    <li key={mentor.id}>
                        {mentor.description} - {mentor.skill_id}
                    </li>
                ))}
            </ul>
            <button onClick={requestMentorship}>Request Mentorship</button>

            <h2>Mentees</h2>
            <ul>
                {mentees.map(mentee => (
                    <li key={mentee.id}>
                        {mentee.start} - {mentee.end}
                    </li>
                ))}
            </ul>
            <button onClick={offerMentorship}>Offer Mentorship</button>
        </div>
    );
};

export default MentorshipComponent;
