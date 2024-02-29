import React from "react";
import Typography from "@mui/material/Typography";
import CreatePosts from "./CreatePosts";
import Experience from "./Experience";
import Events from "./Event";
import Membership from "./Membership";
import Course from "./Course";
import CreateEvents from "../AdminDashboard/CreateEvent";
import ProfilePage2 from "./ProfilePage2";

const DynamicContent2 = ({ selectedItem }) => {
  const getContent = () => {
    switch (selectedItem) {
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
        return (
          <Typography variant="h6" component="div">
            Welcome to Dashboard!
          </Typography>
        );
    }
  };
  return <div style={{ flex: 1, padding: "20px" }}>{getContent()}</div>;
};

export default DynamicContent2;
