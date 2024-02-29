import React from "react";
import Typography from "@mui/material/Typography";
import ManageUsers from "./ManageUsers";
import SendEmail from "./SendEmail";
import CreateEvents from "./CreateEvent";
import ApprovePosts from "./ApprovePosts";
import CreateProfile from "./CreateProfile";
import ProfilePage from "./ProfilePage";

const DynamicContent = ({ selectedItem }) => {
  const getDefaultSelectedItem = () => {
    // Define the default selected item here (e.g., "Posts Approval")
    return "Posts Approval";
  };

  const getContent = () => {
    switch (selectedItem || getDefaultSelectedItem()) {
      case "Profile":
        return (
          <Typography>
            <ProfilePage />
          </Typography>
        );
      case "Manage Users":
        return (
          <Typography>
            <ManageUsers />
          </Typography>
        );
      case "Send Email":
        return (
          <Typography>
            <SendEmail />
          </Typography>
        );
      case "Events":
        return (
          <Typography>
            <CreateEvents />
          </Typography>
        );
      case "Posts Approval":
        return (
          <Typography>
            <ApprovePosts />
          </Typography>
        );
      default:
        return null; // Remove the default message
    }
  };

  return <div style={{ flex: 1, padding: "20px" }}>{getContent()}</div>;
};

export default DynamicContent;
