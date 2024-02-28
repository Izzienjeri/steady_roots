import React, { useState, useEffect } from "react";

const Course = () => {
  const [courses, setCourses] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    level: "",
    start: "",
    end: "",
    qualification: "",
    user_id: "", // Assuming user_id is required for creating a course
  });

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      const token = localStorage.getItem("accessToken");
      const response = await fetch("http://localhost:5555/courses", {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      if (response.ok) {
        const data = await response.json();
        setCourses(data);
      } else {
        throw new Error("Failed to fetch courses");
      }
    } catch (error) {
      console.error("Error fetching courses:", error);
    }
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("accessToken");
      const response = await fetch("http://localhost:5555/courses", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        fetchCourses();
        setFormData({
          name: "",
          level: "",
          start: "",
          end: "",
          qualification: "",
          user_id: "",
        });
      } else {
        throw new Error("Failed to add course");
      }
    } catch (error) {
      console.error("Error adding course:", error);
    }
  };

  const handleDelete = async (courseId) => {
    try {
      const token = localStorage.getItem("accessToken");
      const response = await fetch(
        `http://localhost:5555/courses/${courseId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      if (response.ok) {
        fetchCourses();
      } else {
        throw new Error("Failed to delete course");
      }
    } catch (error) {
      console.error("Error deleting course:", error);
    }
  };

  return (
    <div>
      <h2>Courses</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleInputChange}
          placeholder="Course Name"
          required
        />
        <input
          type="text"
          name="level"
          value={formData.level}
          onChange={handleInputChange}
          placeholder="Level"
          required
        />
        <input
          type="date"
          name="start"
          value={formData.start}
          onChange={handleInputChange}
          placeholder="Start"
          required
        />
        <input
          type="date"
          name="end"
          value={formData.end}
          onChange={handleInputChange}
          placeholder="End"
          required
        />
        <input
          type="text"
          name="qualification"
          value={formData.qualification}
          onChange={handleInputChange}
          placeholder="Qualification"
          required
        />
        <button type="submit">Add Course</button>
      </form>
      <ul>
        {courses.map((course) => (
          <li key={course.id}>
            <div>{course.name}</div>
            <div>{course.level}</div>
            <div>{new Date(course.start).toLocaleDateString()}</div>
            <div>{new Date(course.end).toLocaleDateString()}</div>
            <div>{course.qualification}</div>
            <button onClick={() => handleDelete(course.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Course;