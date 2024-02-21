// CourseComponent.jsx
import React from 'react';

const CourseComponent = ({ course, onDelete }) => {
  return (
    <div>
      <p>{course.name}</p>
      <button onClick={() => onDelete(course.id)}>Delete</button>
    </div>
  );
}

export default CourseComponent;
