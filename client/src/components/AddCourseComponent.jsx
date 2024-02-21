// AddCourseComponent.jsx
import React, { useState } from 'react';

const AddCourseComponent = ({ onAdd }) => {
  const [name, setName] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onAdd(name);
    setName('');
  }

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
      <button type="submit">Add</button>
    </form>
  );
}

export default AddCourseComponent;
