import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import RefreshIcon from "@mui/icons-material/Refresh";
import CreatePosts from "./CreatePosts";
import Experience from "./Experience";
import Events from "./Event";
import Membership from "./Membership";

const DynamicContent2 = ({ selectedItem }) => {
  const getContent = () => {
    switch (selectedItem) {
      case "Posts":
        return (
          <Typography>
            <CreatePosts />;
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
      default:
        return (<Typography></Typography>)(
          <Typography variant="h6" component="div">
            Welcome to Dashboard!
          </Typography>
        );
    }
  };
  return <div style={{ flex: 1, padding: "20px" }}>{getContent()}</div>;
};

export default DynamicContent2;
