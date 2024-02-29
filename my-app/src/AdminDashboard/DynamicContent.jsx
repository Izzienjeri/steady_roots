import React from "react";
import Typography from "@mui/material/Typography";
import ManageUsers from "./ManageUsers";
import SendEmail from "./SendEmail";
import CreateEvents from "./CreateEvent";
import ApprovePosts from "./ApprovePosts";

const DynamicContent = ({ selectedItem }) => {
  const getContent = () => {
    switch (selectedItem) {
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
        return <Typography>Welcome to Dashboard!</Typography>;
    }
  };

  return <div style={{ flex: 1, padding: "20px" }}>{getContent()}</div>;
};

export default DynamicContent;
