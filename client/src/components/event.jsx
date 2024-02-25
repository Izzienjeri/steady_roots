import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Events = () => {
    const [events, setEvents] = useState([]);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = () => {
        axios.get('http://localhost:5555/events')
            .then(response => {
                setEvents(response.data);
            })
            .catch(error => {
                console.error('Error fetching events:', error);
            });
    };

    return (
        <div>
            
            <ul>
                {events.map(event => (
                    <li key={event.id}>
                        <h3>{event.name}</h3>
                        <p>Description: {event.description}</p>
                        <p>Date: {new Date(event.date * 1000).toLocaleDateString()}</p>
                        <img src={event.image} alt={event.name} />
                        <p>Approved: {event.approved ? 'Yes' : 'No'}</p>
                        
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Events;
