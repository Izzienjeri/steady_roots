import React from "react";
import Typography from "@mui/material/Typography";
import CreatePosts from "./CreatePosts";
import Experience from "./Experience";
import Events from "./Event";
import Membership from "./Membership";
import Course from "./Course";
import CreateEvents from "../AdminDashboard/CreateEvent";
import ProfilePage2 from "./ProfilePage2";
import Mentorship from "./Mentorship";

const DynamicContent2 = ({ selectedItem }) => {
  const getDefaultSelectedItem = () => {
    // Define the default selected item here (e.g., "Membership")
    return "Membership";
  };

  const getContent = () => {
    switch (selectedItem || getDefaultSelectedItem()) {
      case "Profile":
        return (
          <Typography>
            <ProfilePage2 />
          </Typography>
        );
      case "Posts":
        return (
          <Typography>
            <CreatePosts />
          </Typography>
        );
      case "Experience":
        return (
          <Typography>
            <Experience />
          </Typography>
        );
      case "Events":
        return (
          <Typography>
            <Events />
          </Typography>
        );

      case "Mentorship":
        return (
          <Typography>
            <Mentorship />
          </Typography>
        );

      case "Membership":
        return (
          <Typography>
            <Membership />
          </Typography>
        );
      case "Courses":
        return (
          <Typography>
            <Course />
          </Typography>
        );
      default:
        return null; // Return null for default case
    }
  };

  return <div style={{ flex: 1, padding: "20px" }}>{getContent()}</div>;
};

export default DynamicContent2;
