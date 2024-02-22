import React, { useState, useEffect } from "react";

const ApprovePosts = () => {
  const [posts, setPosts] = useState([]);
  const [showApproved, setShowApproved] = useState(false); // State to toggle between showing all and approved posts

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
        console.log("Posts data:", data);
        setPosts(data);
      } else {
        console.error("Failed to fetch posts:", response.statusText);
      }
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  };

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
          title: "Updated Title", // Include all fields necessary for updating the post
          description: "Updated Description",
          date_posted: "2024-02-23",
          approved: true,
          approved_by: "Admin", // Include approved_by field if needed
          // Include other fields as needed
        }),
      });
      if (response.ok) {
        setPosts(
          posts.map((post) =>
            post.id === postId ? { ...post, approved: true } : post
          )
        );
      } else {
        console.error("Failed to approve post:", response.statusText);
      }
    } catch (error) {
      console.error("Error approving post:", error);
    }
  };

  const deletePost = async (postId) => {
    try {
      const response = await fetch(`/posts/${postId}`, { method: "DELETE" });
      if (response.ok) {
        setPosts(posts.filter((post) => post.id !== postId));
      } else {
        console.error("Failed to delete post:", response.statusText);
      }
    } catch (error) {
      console.error("Error deleting post:", error);
    }
  };

  // Filter function to show pending or approved posts based on the state
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
            <div>Approved: {post.approved ? "Yes" : "No"}</div>
            <div>Approved By: {post.approved_by}</div>
            {!showApproved && (
              <>
                <button onClick={() => approvePost(post.id)}>Approve</button>
                <button onClick={() => deletePost(post.id)}>Delete</button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ApprovePosts;
