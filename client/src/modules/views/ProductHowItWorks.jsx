import * as React from "react";

import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import Button from "../components/Button";
import Typography from "../components/Typography";

const item = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  px: 5,
};

const number = {
  fontSize: 24,
  fontFamily: "default",
  color: "secondary.main",
  fontWeight: "medium",
};

const image = {
  height: 55,
  my: 4,
};

function AlumniEngagementProcess() {
  return (
    <Box
      component="section"
      sx={{ display: "flex", bgcolor: "secondary.light", overflow: "hidden" }}
    >
      <Container
        sx={{
          mt: 10,
          mb: 15,
          position: "relative",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography variant="h4" marked="center" component="h2" sx={{ mb: 14 }}>
          Alumni Engagement Process
        </Typography>
        <div>
          <Grid container spacing={5}>
            <Grid item xs={12} md={4}>
              <Box sx={item}>
                <Box sx={number}>1.</Box>
                <Box
                  component="img"
                  src="https://freesvg.org/storage/img/thumb/shiny-coin3.png"
                  alt="Apply and pay for membership"
                  sx={image}
                />
                <Typography variant="h5" align="center">
                  Apply for membership and make payment.
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} md={4}>
              <Box sx={item}>
                <Box sx={number}>2.</Box>
                <Box
                  component="img"
                  src="https://freesvg.org/storage/img/thumb/Connections.png"
                  alt="Networking events"
                  sx={image}
                />
                <Typography variant="h5" align="center">
                  Connect with fellow alumni at networking events.
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} md={4}>
              <Box sx={item}>
                <Box sx={number}>3.</Box>
                <Box
                  component="img"
                  src="https://freesvg.org/storage/img/thumb/mentoring-0.png"
                  alt="Mentorship program"
                  sx={image}
                />
                <Typography variant="h5" align="center">
                  Participate in our mentorship program.
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </div>
        <Button
          color="secondary"
          size="large"
          variant="contained"
          component="a"
          href="/signup"
          sx={{ mt: 8 }}
        >
          Explore Alumni Features
        </Button>
      </Container>
    </Box>
  );
}

export default AlumniEngagementProcess;
