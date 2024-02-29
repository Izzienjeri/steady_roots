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

export default function Content2({ selectedItem }) {
  const renderContent = () => {
    switch (selectedItem) {
      case "Posts":
        return <CreatePosts />;
      case "Experience":
        return <Experience />;
      case "Events":
        return <Events />;
      case "Membership":
        return <Membership />;
      default:
        return (
          <Typography variant="h6" component="div">
            Welcome to Dashboard!
          </Typography>
        );
    }
  };
  return (
    <Paper sx={{ maxWidth: 936, margin: "auto", overflow: "hidden" }}>
      <AppBar
        position="static"
        color="default"
        elevation={0}
        sx={{ borderBottom: "1px solid rgba(0, 0, 0, 0.12)" }}
      >
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            {selectedItem || "Dashboard"}
          </Typography>
          <Tooltip title="Refresh">
            <IconButton color="inherit">
              <RefreshIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Search">
            <IconButton color="inherit">
              <SearchIcon />
            </IconButton>
          </Tooltip>
        </Toolbar>
      </AppBar>
      {/* Render dynamic content */}
      {renderContent()}
    </Paper>
  );
}
