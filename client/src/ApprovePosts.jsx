import React, { useState, useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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
      }
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  };

  const notifySuccess = (message) => toast.success(message);
  const notifyError = (message) => toast.error(message);

  const approvePost = async (postId) => {
    try {
      const token = localStorage.getItem("accessToken");
      const response = await fetch(`http://127.0.0.1:5555/posts/${postId}`, {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: "Updated Title",
          description: "Updated Description",
          date_posted: "2024-02-23",
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
    <div>
      <h1>Admin Dashboard</h1>
      <div>
        <button onClick={() => setShowApproved(false)}>Pending Posts</button>
        <button onClick={() => setShowApproved(true)}>Approved Posts</button>
      </div>
      <h2>{showApproved ? "Approved Posts" : "Pending Posts"}</h2>
      <ul>
        {filteredPosts.map((post) => (
          <li key={post.id}>
            <div>Title: {post.title}</div>
            <div>Description: {post.description}</div>
            <div>Date Posted: {post.date_posted}</div>
            {!showApproved && (
              <button onClick={() => approvePost(post.id)}>Approve</button>
            )}
            <button onClick={() => deletePost(post.id)}>Delete</button>
          </li>
        ))}
      </ul>

      <ToastContainer />
    </div>
  );
};

export default ApprovePosts;
