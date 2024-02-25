import React, { useState, useEffect } from 'react';
import axios from 'axios';

const SkillsComponent = () => {
    const [skills, setSkills] = useState([]);
    const [newSkillName, setNewSkillName] = useState('');

    useEffect(() => {
        fetchSkills();
    }, []);

    const fetchSkills = () => {
        axios.get('http://localhost:5555/skills')
            .then(response => {
                setSkills(response.data);
            })
            .catch(error => {
                console.error('Error fetching skills:', error);
            });
    };

    const addSkill = () => {
        axios.post('/skills', { name: newSkillName })
            .then(response => {
                console.log('Skill added successfully:', response.data);
                setNewSkillName(''); 
                fetchSkills(); 
            })
            .catch(error => {
                console.error('Error adding skill:', error);
            });
    };

    return (
        <div>
            
            <input
                type="text"
                value={newSkillName}
                onChange={(e) => setNewSkillName(e.target.value)}
                placeholder="Enter skill name"
            />
            <button onClick={addSkill}>Add Skill</button>

            
            <ul>
                {skills.map(skill => (
                    <li key={skill.id}>{skill.name}</li>
                ))}
            </ul>
        </div>
    );
};

export default SkillsComponent;
