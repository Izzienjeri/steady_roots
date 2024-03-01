import React, { useState } from "react";
import {
  Card,
  CardContent,
  Button,
  TextField,
  Typography,
} from "@mui/material";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Mentorship() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [skillsRequired, setSkillsRequired] = useState("");
  const [bio, setBio] = useState("");
  const [mode, setMode] = useState("request"); // Default mode is requesting mentorship

  const handleRequestMode = () => {
    setMode("request");
  };

  const handleOfferMode = () => {
    setMode("offer");
  };

  const handleMentorshipRequest = () => {
    const requestData = {
      firstName,
      lastName,
      email,
      skills_required: skillsRequired,
    };

    // Simulated fetch
    setTimeout(() => {
      toast.success("Mentorship request created successfully");
    }, 1000);
  };

  const handleMentorshipOffer = () => {
    const offerData = {
      firstName,
      lastName,
      email,
      bio,
    };

    // Simulated fetch
    setTimeout(() => {
      toast.success("Mentorship offer created successfully");
    }, 1000);
  };

  return (
    <div
      style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <h1>Request or Offer Mentorship</h1>
      <div style={{ display: "flex", gap: "10px" }}>
        <Button variant="contained" onClick={handleRequestMode}>
          Request Mentorship
        </Button>
        <Button variant="contained" onClick={handleOfferMode}>
          Offer Mentorship
        </Button>
      </div>
      <Card
        sx={{
          maxWidth: 400,
          marginTop: 4,
          padding: 2,
        }}
      >
        <CardContent>
          <Typography variant="h5" gutterBottom>
            {mode === "request" ? "Request Mentorship" : "Offer Mentorship"}
          </Typography>
          <form
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "10px",
            }}
          >
            <TextField
              label="First Name"
              variant="outlined"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
            <TextField
              label="Last Name"
              variant="outlined"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
            <TextField
              label="Email Address"
              variant="outlined"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            {mode === "request" ? (
              <TextField
                label="Skills Required"
                variant="outlined"
                value={skillsRequired}
                onChange={(e) => setSkillsRequired(e.target.value)}
              />
            ) : (
              <TextField
                label="Bio (skills and experience)"
                variant="outlined"
                value={bio}
                onChange={(e) => setBio(e.target.value)}
              />
            )}
            <Button
              variant="contained"
              onClick={
                mode === "request"
                  ? handleMentorshipRequest
                  : handleMentorshipOffer
              }
            >
              {mode === "request" ? "Request Mentorship" : "Offer Mentorship"}
            </Button>
          </form>
        </CardContent>
      </Card>
      <ToastContainer />
    </div>
  );
}

export default Mentorship;
