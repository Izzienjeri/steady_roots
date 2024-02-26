import React, { useState } from 'react';
import axios from 'axios';

const MentorshipRequestForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    areaOfInterest: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/api/mentorship-request', formData);
      
    } catch (error) {
      console.error('Error submitting mentorship request:', error);
      
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="name"
        placeholder="Your Name"
        value={formData.name}
        onChange={handleChange}
      />
     
      <button type="submit">Request Mentorship</button>
    </form>
  );
};

export default MentorshipRequestForm;