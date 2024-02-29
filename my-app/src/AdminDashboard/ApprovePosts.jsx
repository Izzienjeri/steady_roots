import React, { useState, useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Card, CardContent, Button, Typography } from "@mui/material";
import "./ApprovePosts.css";

const ApprovePosts = () => {
  const [posts, setPosts] = useState([]);
  const [showApproved, setShowApproved] = useState(false);

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
        setPosts(data);
      } else {
        console.error("Failed to fetch posts:", response.statusText);
        notifyError("Failed to fetch posts!");
      }
    } catch (error) {
      console.error("Error fetching posts:", error);
      notifyError("Error fetching posts!");
    }
  };

  const notifySuccess = (message) => toast.success(message);
  const notifyError = (message) => toast.error(message);

  const approvePost = async (postId) => {
    try {
      const token = localStorage.getItem("accessToken");
      const postToUpdate = posts.find((post) => post.id === postId);
      const response = await fetch(`http://127.0.0.1:5555/posts/${postId}`, {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: postToUpdate.title,
          description: postToUpdate.description,
          date_posted: postToUpdate.date_posted,
          approved: true,
          approved_by: "Admin",
        }),
      });
      if (response.ok) {
        setPosts(
          posts.map((post) =>
            post.id === postId ? { ...post, approved: true } : post
          )
        );
        notifySuccess("Post approved successfully!");
      } else {
        console.error("Failed to approve post:", response.statusText);
        notifyError("Failed to approve post!");
      }
    } catch (error) {
      console.error("Error approving post:", error);
      notifyError("Error approving post!");
    }
  };

  const deletePost = async (postId) => {
    try {
      const token = localStorage.getItem("accessToken");
      const response = await fetch(`http://127.0.0.1:5555/posts/${postId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.ok) {
        setPosts(posts.filter((post) => post.id !== postId));
        notifySuccess("Post deleted successfully!");
      } else {
        console.error("Failed to delete post:", response.statusText);
        notifyError("Failed to delete post!");
      }
    } catch (error) {
      console.error("Error deleting post:", error);
      notifyError("Error deleting post!");
    }
  };

  const filteredPosts = showApproved
    ? posts.filter((post) => post.approved)
    : posts.filter((post) => !post.approved);

  return (
    <div className="approve-posts-container">
      <Typography variant="h2" gutterBottom style={{ textAlign: "center" }}>
        Posts Approval
      </Typography>
      <div className="filter-buttons">
        <Button
          variant={showApproved ? "outlined" : "contained"}
          onClick={() => setShowApproved(false)}
        >
          Pending Posts
        </Button>
        <Button
          variant={showApproved ? "contained" : "outlined"}
          onClick={() => setShowApproved(true)}
        >
          Approved Posts
        </Button>
      </div>
      <h2>{showApproved ? "Approved Posts" : "Pending Posts"}</h2>
      <div className="posts-container">
        {filteredPosts.map((post) => (
          <Card
            key={post.id}
            className="post-card"
            style={{
              width: "400px",
              margin: "10px",
              backgroundColor: "rgb(238, 236, 246)",
              transition: "transform 0.3s",
            }}
          >
            <CardContent className="card-content">
              <Typography variant="h5" component="div">
                {post.title}
              </Typography>
              <Typography variant="body1" color="text.secondary">
                {post.description}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Date Posted: {post.date_posted}
              </Typography>
            </CardContent>
            <div className="card-actions">
              {!showApproved && (
                <Button
                  onClick={() => approvePost(post.id)}
                  variant="contained"
                  color="primary"
                >
                  Approve
                </Button>
              )}
              <Button
                onClick={() => deletePost(post.id)}
                variant="contained"
                color="secondary"
              >
                Delete
              </Button>
            </div>
          </Card>
        ))}
      </div>
      <ToastContainer />
    </div>
  );
};

export default ApprovePosts;
