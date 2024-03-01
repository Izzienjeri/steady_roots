// Navigator.jsx
import React from "react";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import HomeIcon from "@mui/icons-material/Home";
import PeopleIcon from "@mui/icons-material/People";
import DnsRoundedIcon from "@mui/icons-material/DnsRounded";
import PermMediaOutlinedIcon from "@mui/icons-material/PhotoSizeSelectActual";
import SettingsInputComponentIcon from "@mui/icons-material/SettingsInputComponent";
import SettingsEthernetIcon from "@mui/icons-material/SettingsEthernet";
import Logout from "../Logout";

const categories = [
  {
    id: "Build",
    children: [
      {
        id: "Profile",
        icon: <PeopleIcon />,
      },
      {
        id: "Posts",
        icon: <PermMediaOutlinedIcon />,
      },
      {
        id: "Mentorship",
        icon: <SettingsEthernetIcon />,
      },
      {
        id: "Experience",
        icon: <SettingsEthernetIcon />,
      },
      {
        id: "Events",
        icon: <SettingsInputComponentIcon />,
      },
      {
        id: "Membership",
        icon: <PeopleIcon />,
      },
      {
        id: "Courses",
        icon: <PeopleIcon />,
      },
    ],
  },
];

const Navigator2 = ({ onItemClick, selectedItem }) => {
  const handleItemClick = (itemId) => {
    onItemClick(itemId);
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        alignItems: "center",
        width: 240,
        backgroundColor: "#f0f0f0",
        height: "100vh",
        position: "relative", // Position relative for Logout button positioning
      }}
    >
      <List>
        {categories.map((category) => (
          <div key={category.id}>
            {category.children.map((child) => (
              <ListItemButton
                key={child.id}
                onClick={() => handleItemClick(child.id)}
                selected={selectedItem === child.id}
              >
                <ListItemIcon>{child.icon}</ListItemIcon>
                <ListItemText primary={child.id} />
              </ListItemButton>
            ))}
          </div>
        ))}
      </List>
      {/* Absolute positioning for the Logout button */}
      <div style={{ position: "absolute", bottom: 10 }}>
        <Logout />
      </div>
    </div>
  );
};

export default Navigator2;
