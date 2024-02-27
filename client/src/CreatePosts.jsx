import React, { useState, useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const CreatePosts = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [approvedPosts, setApprovedPosts] = useState([]);

  const notifySuccess = (message) => toast.success(message);
  const notifyError = (message) => toast.error(message);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const token = localStorage.getItem("accessToken");
      const response = await fetch("http://127.0.0.1:5555/posts", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.ok) {
        const data = await response.json();
        // Filter out approved posts locally
        const filteredPosts = data.filter((post) => post.approved);
        setApprovedPosts(filteredPosts);
      } else {
        console.error("Failed to fetch posts:", response.statusText);
      }
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  };

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
        // Refresh approved posts after creating a new one
        fetchPosts();
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
    <div>
      <h2>Create New Post</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="title">Title:</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="description">Description:</label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>
        <button type="submit">Create Post</button>
      </form>

      <h2>Approved Posts</h2>
      <ul>
        {approvedPosts.map((post) => (
          <li key={post.id}>
            <div>Title: {post.title}</div>
            <div>Description: {post.description}</div>
            <div>Date Posted: {post.date_posted}</div>
          </li>
        ))}
      </ul>

      <ToastContainer />
    </div>
  );
};

export default CreatePosts;
