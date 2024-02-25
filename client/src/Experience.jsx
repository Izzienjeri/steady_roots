import React, { useState, useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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
    <div>
      <h2>Experiences</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="organisation"
          value={formData.organisation}
          onChange={handleChange}
          placeholder="Organisation"
          required
        />
        <input
          type="text"
          name="job_title"
          value={formData.job_title}
          onChange={handleChange}
          placeholder="Job Title"
          required
        />
        <input
          type="text"
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Description"
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

        <button type="submit">Add Experience</button>
      </form>
      <ul>
        {experiences.map((experience) => (
          <li key={experience.id}>
            <div>{experience.organisation}</div>
            <div>{experience.job_title}</div>
            <div>{experience.description}</div>
            <div>{experience.start}</div>
            <div>{experience.end}</div>
            <button onClick={() => handleDelete(experience.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Experience;
