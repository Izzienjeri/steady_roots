import React from "react";
import { Button } from "@mui/material";

const LogoutButton = () => {
  const handleLogout = async () => {
    try {
      const response = await fetch("/logout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      });
      if (response.ok) {
        localStorage.removeItem("accessToken");
        console.log("Logged out successfully");
      } else {
        console.error("Failed to logout");
      }
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  return (
    <Button variant="contained" color="primary" onClick={handleLogout}>
      Logout
    </Button>
  );
};

export default LogoutButton;
