import React from 'react';
import axios from 'axios';


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
            console.log('Your mentorship request has been sent successfully', response.data);
        }   catch (error) {
            console.error('Error sending mentorship request:')

        }
        
};

return (
    <div>
      <h2>Request Mentorship</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Description:</label>
          <input type="text" name="description" value={formData.description} onChange={handleChange} />
        </div>
        <div>
          <label>Skill ID:</label>
          <input type="text" name="skill_id" value={formData.skill_id} onChange={handleChange} />
        </div>
        <button type="submit">Submit Request</button>
      </form>
    </div>
  );
};


export default MentorshipResquestForm;