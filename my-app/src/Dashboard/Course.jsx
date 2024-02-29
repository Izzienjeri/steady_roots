import React, { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardActions, // Add this import
  Button,
  TextField,
  Grid,
  Typography, // Add this import
} from "@mui/material";
import CancelIcon from "@mui/icons-material/Cancel"; // Add this import
import "./Course.css"; // Import the CSS file

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
    <div className="course-container">
      <h2>Courses</h2>
      <form className="course-form" onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              id="name"
              name="name"
              label="Course Name"
              value={formData.name}
              onChange={handleInputChange}
              required
            />
          </Grid>
          <Grid item xs={4}>
            <TextField
              id="level"
              name="level"
              label="Level"
              value={formData.level}
              onChange={handleInputChange}
              required
            />
          </Grid>
          <Grid item xs={4}>
            <TextField
              fullWidth
              id="qualification"
              name="qualification"
              label="Qualification"
              value={formData.qualification}
              onChange={handleInputChange}
              required
            />
          </Grid>
          <Grid item xs={4}>
            <TextField
              fullWidth
              id="start"
              name="start"
              label="Start Date"
              type="date"
              value={formData.start}
              onChange={handleInputChange}
              InputLabelProps={{
                shrink: true,
              }}
              required
            />
          </Grid>
          <Grid item xs={4}>
            <TextField
              fullWidth
              id="end"
              name="end"
              label="End Date"
              type="date"
              value={formData.end}
              onChange={handleInputChange}
              InputLabelProps={{
                shrink: true,
              }}
              required
            />
          </Grid>

          <Grid item xs={12}>
            <Button type="submit" variant="contained" color="primary">
              Add Course
            </Button>
          </Grid>
        </Grid>
      </form>
      <Grid container spacing={2}>
        {courses.map((course) => (
          <Grid item xs={12} sm={6} md={4} key={course.id}>
            <Card className="course-card">
              <CardContent className="course-card-content">
                <Typography variant="h6">{course.name}</Typography>
                <Typography variant="body1">{course.level}</Typography>
                <Typography variant="body1">{course.qualification}</Typography>
                <Typography variant="caption">
                  {course.start} - {course.end}
                </Typography>
              </CardContent>
              <CardActions className="course-card-actions">
                <Button
                  variant="contained"
                  color="secondary"
                  startIcon={<CancelIcon />}
                  onClick={() => handleDelete(course.id)}
                  className="course-deleteButton"
                >
                  Delete
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default Course;
