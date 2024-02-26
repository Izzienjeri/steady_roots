import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Courses = () => {
  const [courses, setCourses] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    level: "",
    start: "",
    end: "",
    qualification: "",
    user_id: "",
  });

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      const token = localStorage.getItem("accessToken");
      const response = await fetch("http://127.0.0.1:5555/courses", {
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

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("accessToken");
      const response = await fetch("http://127.0.0.1:5555/courses", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        toast.success("Course added successfully");
        setFormData({
          name: "",
          level: "",
          start: "",
          end: "",
          qualification: "",
          user_id: "",
        });
        fetchCourses();
      } else {
        throw new Error("Failed to add course");
      }
    } catch (error) {
      console.error("Error adding course:", error);
      toast.error("Failed to add course");
    }
  };

  const handleDelete = async (courseId) => {
    try {
      const token = localStorage.getItem("accessToken");
      const response = await fetch(
        `http://127.0.0.1:5555/courses/${courseId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      if (response.ok) {
        setCourses(courses.filter((course) => course.id !== courseId));
      } else {
        console.error("Failed to delete course");
        toast.error("Failed to delete course");
      }
    } catch (error) {
      console.error("Error deleting course:", error);
      toast.error("Error deleting course");
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
          onChange={handleChange}
          placeholder="Course Name"
          required
        />
        <input
          type="text"
          name="level"
          value={formData.level}
          onChange={handleChange}
          placeholder="Level"
          required
        />
        <input
          type="date"
          name="start"
          value={formData.start}
          onChange={handleChange}
          placeholder="Start Date"
          required
        />
        <input
          type="date"
          name="end"
          value={formData.end}
          onChange={handleChange}
          placeholder="End Date"
          required
        />
        <input
          type="text"
          name="qualification"
          value={formData.qualification}
          onChange={handleChange}
          placeholder="Qualification"
          required
        />
        <input
          type="text"
          name="user_id"
          value={formData.user_id}
          onChange={handleChange}
          placeholder="User ID"
          required
        />
        <button type="submit">Add Course</button>
      </form>
      <ul>
        {courses.map((course) => (
          <li key={course.id}>
            <div>{course.name}</div>
            <div>{course.level}</div>
            <div>{course.start}</div>
            <div>{course.end}</div>
            <div>{course.qualification}</div>
            <button onClick={() => handleDelete(course.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Courses;
