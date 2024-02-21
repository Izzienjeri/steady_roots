import React, { useState } from 'react';
import './App.css';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import Login from "./components/Login";
import Signup from "./components/Signup";
import ExperienceComponent from './components/ExperienceComponent';
import CourseComponent from './components/CourseComponent';
import AddExperienceComponent from './components/AddExperienceComponent';
import AddCourseComponent from './components/AddCourseComponent';

function App() {
  const [experiences, setExperiences] = useState([]);
  const [courses, setCourses] = useState([]);

  const handleAddExperience = (description) => {
    const newExperience = { id: Date.now(), description };
    setExperiences([...experiences, newExperience]);
  }

  const handleDeleteExperience = (id) => {
    setExperiences(experiences.filter(experience => experience.id !== id));
  }

  const handleAddCourse = (name) => {
    const newCourse = { id: Date.now(), name };
    setCourses([...courses, newCourse]);
  }

  const handleDeleteCourse = (id) => {
    setCourses(courses.filter(course => course.id !== id));
  }

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </BrowserRouter>

      <h2>Experiences</h2>
      <AddExperienceComponent onAdd={handleAddExperience} />
      {experiences.map(experience => (
        <ExperienceComponent key={experience.id} experience={experience} onDelete={handleDeleteExperience} />
      ))}

      <h2>Courses</h2>
      <AddCourseComponent onAdd={handleAddCourse} />
      {courses.map(course => (
        <CourseComponent key={course.id} course={course} onDelete={handleDeleteCourse} />
      ))}
    </div>
  );
}

export default App;
