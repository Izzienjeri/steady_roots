import React, { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardActions,
  Button,
  TextField,
  Grid,
  Typography,
} from "@mui/material";
import CancelIcon from "@mui/icons-material/Cancel";
import "./Skill.css";

const Skill = () => {
  const [skills, setSkills] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
  });

  useEffect(() => {
    fetchSkills();
  }, []);

  const fetchSkills = async () => {
    try {
      const response = await fetch("http://localhost:5555/skills", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      });
      if (response.ok) {
        const data = await response.json();
        setSkills(data);
      } else {
        throw new Error("Failed to fetch skills");
      }
    } catch (error) {
      console.error("Error fetching skills:", error);
    }
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5555/skills", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        fetchSkills();
        setFormData({ name: "" });
      } else {
        throw new Error("Failed to add skill");
      }
    } catch (error) {
      console.error("Error adding skill:", error);
    }
  };

  const handleDelete = async (skillId) => {
    try {
      const token = localStorage.getItem("accessToken");
      const response = await fetch(
        `http://localhost:5555/skills/${skillId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      if (response.ok) {
        fetchSkills();
      } else {
        throw new Error("Failed to delete skill");
      }
    } catch (error) {
      console.error("Error deleting skill:", error);
    }
  };

  return (
    <div className="course-container">
      <Typography variant="h2" gutterBottom style={{ textAlign: "center" }}>
        Skills
      </Typography>
      <form className="course-form" onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              id="name"
              name="name"
              label="Skill Name"
              value={formData.name}
              onChange={handleInputChange}
              required
            />
          </Grid>
          <Grid item xs={12}>
            <Button type="submit" variant="contained" color="primary">
              Add Skill
            </Button>
          </Grid>
        </Grid>
      </form>
      <Grid container spacing={2}>
        {skills.map((skill) => (
          <Grid item xs={12} sm={6} md={4} key={skill.id}>
            <Card className="course-card">
              <CardContent className="course-card-content">
                <Typography variant="h6">{skill.name}</Typography>
              </CardContent>
              <CardActions className="course-card-actions">
                <Button
                  variant="contained"
                  color="secondary"
                  startIcon={<CancelIcon />}
                  onClick={() => handleDelete(skill.id)}
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

export default Skill;
