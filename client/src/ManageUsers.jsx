import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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
    <div>
      <h1>Manage Users</h1>
      <ToastContainer />
      <table>
        <thead>
          <tr>
            <th>Email</th>
            <th>Role</th>
            <th>Email Subscription</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.email}</td>
              <td>{user.role}</td>
              <td>
                {user.email_subscription ? "Subscribed" : "Not Subscribed"}
              </td>
              <td>
                <button onClick={() => deactivateUser(user.id)}>
                  Deactivate
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ManageUsers;
