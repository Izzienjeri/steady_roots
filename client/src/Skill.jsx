import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Skill = () => {
  const [skills, setSkills] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    mentor_id: "",
    mentee_id: "",
  });

  useEffect(() => {
    fetchSkills();
  }, []);

  const fetchSkills = async () => {
    try {
      const token = localStorage.getItem("accessToken");
      const response = await fetch("http://127.0.0.1:5555/skills", {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
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

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("accessToken");
      const response = await fetch("http://127.0.0.1:5555/skills", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        toast.success("Skill added successfully");
        setFormData({
          name: "",
          mentor_id: "",
          mentee_id: "",
        });
        fetchSkills();
      } else {
        throw new Error("Failed to add skill");
      }
    } catch (error) {
      console.error("Error adding skill:", error);
      toast.error("Failed to add skill");
    }
  };

  const handleDelete = async (skillId) => {
    try {
      const token = localStorage.getItem("accessToken");
      const response = await fetch(
        `http://127.0.0.1:5555/skills/${skillId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      if (response.ok) {
        setSkills(skills.filter((skill) => skill.id !== skillId));
      } else {
        console.error("Failed to delete skill");
        toast.error("Failed to delete skill");
      }
    } catch (error) {
      console.error("Error deleting skill:", error);
      toast.error("Error deleting skill");
    }
  };

  return (
    <div>
      <h2>Skills</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Skill Name"
          required
        />
        <input
          type="text"
          name="mentor_id"
          value={formData.mentor_id}
          onChange={handleChange}
          placeholder="Mentor ID"
        />
        <input
          type="text"
          name="mentee_id"
          value={formData.mentee_id}
          onChange={handleChange}
          placeholder="Mentee ID"
        />
        <button type="submit">Add Skill</button>
      </form>
      <ul>
        {skills.map((skill) => (
          <li key={skill.id}>
            <div>{skill.name}</div>
            <div>{skill.mentor_id}</div>
            <div>{skill.mentee_id}</div>
            <button onClick={() => handleDelete(skill.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Skill;
