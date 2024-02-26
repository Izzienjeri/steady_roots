import React, { useState, useEffect } from react ;
import axios from 'axios' ;

const YourComponent = () => {
    const [experience, setExperience] = useState([]);
    const [newExperience, setNewExperience] = useState({
        organisation: '',
        job_title: '',
        description: '',
        start: '',
        end: '',
        user_id: '',
    });
    useEffect(() => {
        fetchData();
    },[]);

    const fetchData = () => {
        axios,get('http://localhost:5555/experiences')
        .then(response => {
            setExperiences(response.data);
        })
        .catch(error => {
            console.error('Error fetching experience:', error);
        });
    };
     return (
        <div>
            {}
            <input
                type="text"
                value={newExperience.organisation}
                onChange={e => setNewExperience({ ...newExperience, organisation: e.target.value })}
                placeholder="Organisation"
            />
            <input
                type="text"
                value={newExperience.job_title}
                onChange={e => setNewExperience({ ...newExperience, job_title: e.target.value })}
                placeholder="Job Title"
            />
            {}

            <button onClick={addExperience}>Add Experience</button>

            {}
            <ul>
                {experiences.map(experience => (
                    <li key={experience.id}>
                        {experience.organisation} - {experience.job_title}
                        {}
                        <button onClick={() => updateExperience(experience.id, {})}>Update</button>
                        <button onClick={() => deleteExperience(experience.id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default YourComponent;
