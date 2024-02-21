// ExperienceComponent.jsx
import React from 'react';

const ExperienceComponent = ({ experience, onDelete }) => {
  return (
    <div>
      <p>{experience.description}</p>
      <button onClick={() => onDelete(experience.id)}>Delete</button>
    </div>
  );
}

export default ExperienceComponent;
