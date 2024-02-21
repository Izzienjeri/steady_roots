import * as React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import ButtonBase from "@mui/material/ButtonBase";
import Container from "@mui/material/Container";
import Typography from "../components/Typography";

const ImageBackdrop = styled("div")(({ theme }) => ({
  position: "absolute",
  left: 0,
  right: 0,
  top: 0,
  bottom: 0,
  background: "#000",
  opacity: 0.5,
  transition: theme.transitions.create("opacity"),
}));

const ImageIconButton = styled(ButtonBase)(({ theme }) => ({
  position: "relative",
  display: "block",
  padding: 0,
  borderRadius: 0,
  height: "40vh",
  [theme.breakpoints.down("md")]: {
    width: "100% !important",
    height: 100,
  },
  "&:hover": {
    zIndex: 1,
  },
  "&:hover .imageBackdrop": {
    opacity: 0.15,
  },
  "&:hover .imageMarked": {
    opacity: 0,
  },
  "&:hover .imageTitle": {
    border: "4px solid currentColor",
  },
  "& .imageTitle": {
    position: "relative",
    padding: `${theme.spacing(2)} ${theme.spacing(4)} 14px`,
  },
  "& .imageMarked": {
    height: 3,
    width: 18,
    background: theme.palette.common.white,
    position: "absolute",
    bottom: -2,
    left: "calc(50% - 9px)",
    transition: theme.transitions.create("opacity"),
  },
}));

const images = [
  {
    url: "https://media.istockphoto.com/id/530977027/photo/business-opportunity.jpg?s=612x612&w=0&k=20&c=bQlXtZHj5XN1lNiH23ax2PgloM_3iTWni7UFpUhlXFk=",
    title: "Opportunities",
    width: "40%",
  },
  {
    url: "https://images.unsplash.com/photo-1484981138541-3d074aa97716?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8cG93ZXIlMjB1cCUyMHlvdXIlMjBwcm9maWxlfGVufDB8fDB8fHww",
    title: "Power Up Your Profile",
    width: "20%",
  },
  {
    url: "https://media.istockphoto.com/id/953782406/photo/hand-of-touching-network-connecting-the-human-dots-icon-in-business-project-management.jpg?s=612x612&w=0&k=20&c=nGWbpiMU7vhRjuBUjgpHr9TPESOKaDOACC6nzb1pI_4=",
    title: "Connect and Collaborate",
    width: "40%",
  },
  {
    url: "https://images.unsplash.com/photo-1453747063559-36695c8771bd?auto=format&fit=crop&w=400",
    title: "Seamless Membership Access",
    width: "38%",
  },
  {
    url: "https://plus.unsplash.com/premium_photo-1683325807407-50194b1d6eed?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTN8fG1lbnRvcnNoaXB8ZW58MHx8MHx8fDA%3D",
    title: "Grow with Mentorship",
    width: "38%",
  },
  {
    url: "https://images.unsplash.com/photo-1594016363917-c235373c5d2b?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fHN0YXklMjBpbiUyMHRoZSUyMGxvb3B8ZW58MHx8MHx8fDA%3D",
    title: "Stay in the Loop",
    width: "24%",
  },
  {
    url: "https://plus.unsplash.com/premium_photo-1667516485570-de9db9f09ff0?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTN8fGxlYWRlcnNoaXB8ZW58MHx8MHx8fDA%3D",
    title: "Take up Leadership roles",
    width: "40%",
  },
  {
    url: "https://images.unsplash.com/photo-1527525443983-6e60c75fff46?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8Y29tbXVuaXJ5JTIwc3VwcG9ydHxlbnwwfHwwfHx8MA%3D%3D",
    title: "Community Support and Engagement:",
    width: "20%",
  },
  {
    url: "https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Y2FyZWVyJTIwZGV2ZWxvcG1lbnQlMjByZXNvdXJjZXN8ZW58MHx8MHx8fDA%3D",
    title: "Career Development Resources",
    width: "40%",
  },
];

export default function ProductCategories() {
  return (
    <Container component="section" sx={{ mt: 8, mb: 4 }}>
      <Typography variant="h4" marked="center" align="center" component="h2">
        Elevate Your Professional Journey with Membership Benefits
      </Typography>
      <Box sx={{ mt: 8, display: "flex", flexWrap: "wrap" }}>
        {images.map((image) => (
          <ImageIconButton
            key={image.title}
            style={{
              width: image.width,
            }}
          >
            <Box
              sx={{
                position: "absolute",
                left: 0,
                right: 0,
                top: 0,
                bottom: 0,
                backgroundSize: "cover",
                backgroundPosition: "center 40%",
                backgroundImage: `url(${image.url})`,
              }}
            />
            <ImageBackdrop className="imageBackdrop" />
            <Box
              sx={{
                position: "absolute",
                left: 0,
                right: 0,
                top: 0,
                bottom: 0,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "common.white",
              }}
            >
              <Typography
                component="h3"
                variant="h6"
                color="inherit"
                className="imageTitle"
              >
                {image.title}
                <div className="imageMarked" />
              </Typography>
            </Box>
          </ImageIconButton>
        ))}
      </Box>
    </Container>
  );
}
