import * as React from "react";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import Box from "@mui/material/Box";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { Link } from "react-router-dom"; // Import Link from react-router-dom
import SettingsEthernetIcon from "@mui/icons-material/SettingsEthernet";
import HomeIcon from "@mui/icons-material/Home";
import PermMediaOutlinedIcon from "@mui/icons-material/PhotoSizeSelectActual";

const categories = [
  {
    id: "Build",
    children: [
      {
        id: "Posts",
        icon: <PermMediaOutlinedIcon />,
        path: "/createposts",
      },
      {
        id: "Experience",
        icon: <SettingsEthernetIcon />,
        path: "/experiences",
      },
    ],
  },
];

const item = {
  py: "2px",
  px: 3,
  color: "rgba(255, 255, 255, 0.7)",
  "&:hover, &:focus": {
    bgcolor: "rgba(255, 255, 255, 0.08)",
  },
};

const itemCategory = {
  boxShadow: "0 -1px 0 rgb(255,255,255,0.1) inset",
  py: 1.5,
  px: 3,
};

export default function Navigator2(props) {
  const { ...other } = props;

  return (
    <Drawer variant="permanent" {...other}>
      <List disablePadding>
        <ListItem sx={item}>Steady Roots 🖤</ListItem>
        <ListItem sx={item}>
          <ListItemIcon>
            <HomeIcon />
          </ListItemIcon>
          <ListItemText> DashBoard</ListItemText>
        </ListItem>
        {categories.map(({ id, children }) => (
          <Box key={id}>
            <ListItem sx={itemCategory}>
              <ListItemText>{id}</ListItemText>
            </ListItem>
            {children.map(({ id: childId, icon, path }) => (
              <ListItem disablePadding key={childId} component={Link} to={path}>
                {" "}
                <ListItemButton sx={item}>
                  <ListItemIcon>{icon}</ListItemIcon>
                  <ListItemText>{childId}</ListItemText>
                </ListItemButton>
              </ListItem>
            ))}
            <Divider />
          </Box>
        ))}
      </List>
    </Drawer>
  );
}
