import React from 'react';
import axios from 'axios';

//generate a mentorship form.
const MentorshipResquestForm = () => {
    const [formData, setFormData] = usestate({
        description: '',
        skill_id: '',
        user_id: ''
    })

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value});
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post ('/mentors', formData);
            console.log('Your mentorship request has been sent successfully')
        }
        
}