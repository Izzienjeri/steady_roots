import React, { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import styled from "@mui/material/styles/styled";

import FormButton from "../modules/form/FormButton";

import "./CreatePosts.css";


const CreatePosts = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const notifySuccess = (message) => toast.success(message);
  const notifyError = (message) => toast.error(message);

  const [approvedPosts, setApprovedPosts] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("accessToken");
      const response = await fetch("http://127.0.0.1:5555/posts", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          description,
          date_posted: new Date().toISOString(),
          approved: false,
        }),
      });
      if (response.ok) {
        console.log(
          "Post created successfully, please wait for admin approval."
        );
        setTitle("");
        setDescription("");
        notifySuccess("Post created successfully!");
      } else {
        console.error("Failed to create post:", response.statusText);
        notifyError("Failed to create post!");
      }
    } catch (error) {
      console.error("Error creating post:", error);
      notifyError("Error creating post!");
    }
  };

  return (
    <div className="createPosts-container">
      <Typography className="createPosts-title" variant="h4" gutterBottom>
        Create New Post
      </Typography>
      <div className="createPosts-formContainer">
        <form onSubmit={handleSubmit}>
          <TextField
            id="title"
            label="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            variant="outlined"
            fullWidth
            required
            className="createPosts-input"
          />
          <TextField
            id="description"
            label="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            variant="outlined"
            multiline
            rows={4}
            fullWidth
            required
            className="createPosts-input"
          />
          <FormButton type="submit" variant="contained" color="primary">
            Create Post
          </FormButton>
        </form>
      </div>

      <Typography variant="h4" gutterBottom></Typography>
      <div className="createPosts-cardContainer">
        {approvedPosts.map((post) => (
          <Card
            key={post.id}
            className="createPosts-card"
            style={{
              width: "400px",
              margin: "10px",
              backgroundColor: "beige",
              transition: "transform 0.3s",
            }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.transform = "scale(1.05)")
            }
            onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
          >
            <CardContent>
              <Typography variant="h6">{post.title}</Typography>
              <Typography variant="body1">{post.description}</Typography>
              <Typography variant="caption">
                Date Posted: {post.date_posted}
              </Typography>
            </CardContent>
          </Card>
        ))}
      </div>

      <ToastContainer />
    </div>
  );
};

export default CreatePosts;
