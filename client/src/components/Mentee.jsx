
import  { useState, useEffect } from 'react';
import axios from 'axios'; 

const Mentee = () => {
  const [mentees, setMentees] = useState([]);
  const [newMentee, setNewMentee] = useState({});

  useEffect(() => {
    axios.get('/api/mentees')
      .then((response) => {
        setMentees(response.data);
      })
      .catch((error) => {
        console.error('Error fetching mentees:', error);
      });
  }, []);

  const handleCreateMentee = () => {
    axios.post('/api/mentees', newMentee)
      .then((response) => {
        setMentees([...mentees, response.data]);
        setNewMentee({});
      })
      .catch((error) => {
        console.error('Error creating mentee:', error);
      });
  };

  const handleDeleteMentee = (id) => {
    axios.delete(`/api/mentees/${id}`)
      .then(() => {
        const updatedMentees = mentees.filter((mentee) => mentee.id !== id);
        setMentees(updatedMentees);
      })
      .catch((error) => {
        console.error('Error deleting mentee:', error);
      });
  };

  return (
    <div>
      <h1>Mentees</h1>
      <ul>
        {mentees.map((mentee) => (
          <li key={mentee.id}>
            {mentee.name} ({mentee.role})
            <button onClick={() => handleDeleteMentee(mentee.id)}>Delete</button>
          </li>
        ))}
      </ul>
      <input
        type="text"
        placeholder="Name"
        value={newMentee.name || ''}
        onChange={(e) => setNewMentee({ ...newMentee, name: e.target.value })}
      />
      <input
        type="text"
        placeholder="Role"
        value={newMentee.role || ''}
        onChange={(e) => setNewMentee({ ...newMentee, role: e.target.value })}
      />
      <button onClick={handleCreateMentee}>Add Mentee</button>
    </div>
  );
};

export default Mentee;
