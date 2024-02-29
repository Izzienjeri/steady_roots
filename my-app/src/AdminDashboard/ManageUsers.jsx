import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Card, CardContent, Button, Typography } from "@mui/material";
import "./ManageUsers.css";

const ManageUsers = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const token = localStorage.getItem("accessToken");
      const response = await fetch("http://127.0.0.1:5555/users", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.ok) {
        const data = await response.json();
        const normalUsers = data.filter((user) => user.role !== "admin");
        setUsers(normalUsers);
      } else {
        console.error("Failed to fetch users:", response.statusText);
        toast.error("Failed to fetch users");
      }
    } catch (error) {
      console.error("Error fetching users:", error);
      toast.error("Error fetching users");
    }
  };

  const deactivateUser = async (userId) => {
    try {
      const token = localStorage.getItem("accessToken");
      const response = await fetch(`http://127.0.0.1:5555/users/${userId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.ok) {
        setUsers(users.filter((user) => user.id !== userId));
        toast.success("User deactivated successfully");
      } else {
        console.error("Failed to deactivate user:", response.statusText);
        toast.error("Failed to deactivate user");
      }
    } catch (error) {
      console.error("Error deactivating user:", error);
      toast.error("Error deactivating user");
    }
  };

  return (
    <div className="manage-users-container">
      <h1>Manage Users</h1>
      <ToastContainer />
      <div className="cards-container">
        {users.map((user) => (
          <Card
            key={user.id}
            className="user-card"
            style={{
              width: "400px",
              margin: "10px",
              backgroundColor: "rgb(238, 236, 246)",
              transition: "transform 0.3s",
            }}
          >
            <CardContent>
              <Typography variant="h5" component="div">
                {user.email}
              </Typography>
              <Typography variant="body1" color="text.secondary">
                Role: {user.role}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {user.email_subscription ? "Subscribed" : "Not Subscribed"}
              </Typography>
            </CardContent>
            <div className="card-action">
              <Button
                onClick={() => deactivateUser(user.id)}
                variant="contained"
                color="secondary"
              >
                Deactivate
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ManageUsers;
