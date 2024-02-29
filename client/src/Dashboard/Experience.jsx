import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import CancelIcon from "@mui/icons-material/Cancel";

import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Grid from "@mui/material/Grid";
import "./Experience.css";

const Experience = () => {
  const [experiences, setExperiences] = useState([]);
  const [formData, setFormData] = useState({
    organisation: "",
    job_title: "",
    description: "",
    start: "",
    end: "",
    user_id: "",
  });

  useEffect(() => {
    fetchExperiences();
  }, []);

  const fetchExperiences = async () => {
    try {
      const token = localStorage.getItem("accessToken");
      const response = await fetch("http://127.0.0.1:5555/experiences", {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        const data = await response.json();
        setExperiences(data);
      } else {
        throw new Error("Failed to fetch experiences");
      }
    } catch (error) {
      console.error("Error fetching experiences:", error);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("accessToken");
      const start_date = new Date(formData.start).toISOString();
      const end_date = new Date(formData.end).toISOString();

      const response = await fetch("http://127.0.0.1:5555/experiences", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        toast.success("Experience added successfully");
        setFormData({
          organisation: "",
          job_title: "",
          description: "",
          start: "",
          end: "",
          user_id: "",
        });
        fetchExperiences();
      } else {
        throw new Error("Failed to add experience");
      }
    } catch (error) {
      console.error("Error adding experience:", error);
      toast.error("Failed to add experience");
    }
  };

  const handleDelete = async (experienceId) => {
    try {
      const token = localStorage.getItem("accessToken");
      const response = await fetch(
        `http://127.0.0.1:5555/experiences/${experienceId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      if (response.ok) {
        setExperiences(
          experiences.filter((experience) => experience.id !== experienceId)
        );
      } else {
        console.error("Failed to delete experience");
        toast.error("Failed to delete experience");
      }
    } catch (error) {
      console.error("Error deleting experience:", error);
      toast.error("Error deleting experience");
    }
  };

  return (
    <div className="experience-container">
      <Typography variant="h2" gutterBottom>
        Experiences
      </Typography>
      <form className="experience-form" onSubmit={handleSubmit}>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              id="organisation"
              name="organisation"
              label="Organisation"
              value={formData.organisation}
              onChange={handleChange}
              required
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              id="job_title"
              name="job_title"
              label="Job Title"
              value={formData.job_title}
              onChange={handleChange}
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              id="description"
              name="description"
              label="Description"
              value={formData.description}
              onChange={handleChange}
              required
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              id="start"
              name="start"
              label="Start Date"
              type="date"
              value={formData.start}
              onChange={handleChange}
              required
              InputLabelProps={{
                shrink: true,
              }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              id="end"
              name="end"
              label="End Date"
              type="date"
              value={formData.end}
              onChange={handleChange}
              required
              InputLabelProps={{
                shrink: true,
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <Button type="submit" variant="contained" color="primary">
              Add Experience
            </Button>
          </Grid>
        </Grid>
      </form>
      <Grid container spacing={2}>
        {experiences.map((experience) => (
          <Grid item xs={12} sm={6} md={4} key={experience.id}>
            <Card className="experience-card  ">
              <CardContent className="experience-card-content">
                <Typography variant="h6">{experience.organisation}</Typography>
                <Typography variant="body1">{experience.job_title}</Typography>
                <Typography variant="body1">
                  {experience.description}
                </Typography>
                <Typography variant="caption">
                  {experience.start} - {experience.end}
                </Typography>
              </CardContent>
              <CardActions className="experience-card-actions">
                <Button
                  variant="contained"
                  color="secondary"
                  startIcon={<CancelIcon />} // Replace DeleteIcon with CancelIcon
                  onClick={() => handleDelete(experience.id)}
                  className="experience-deleteButton"
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

export default Experience;
