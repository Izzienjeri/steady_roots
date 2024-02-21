// AddExperienceComponent.jsx
import React, { useState } from 'react';

const AddExperienceComponent = ({ onAdd }) => {
  const [description, setDescription] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onAdd(description);
    setDescription('');
  }

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} />
      <button type="submit">Add</button>
    </form>
  );
}

export default AddExperienceComponent;
