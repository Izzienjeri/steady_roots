import React, { useState } from "react";

function App() {
  const [skillsRequired, setSkillsRequired] = useState("");
  const [bio, setBio] = useState("");

  const handleMentorshipRequest = () => {
    fetch("http://127.0.0.1:5555/request", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`, // Retrieve JWT token from localStorage
      },
      body: JSON.stringify({
        skills_required: skillsRequired,
      }),
    })
      .then((response) => {
        if (response.ok) {
          console.log("Mentorship request created successfully");
        } else {
          console.error("Failed to create mentorship request");
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const handleMentorshipOffer = () => {
    fetch("http://127.0.0.1:5555/offer", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`, // Retrieve JWT token from localStorage
      },
      body: JSON.stringify({
        bio: bio,
      }),
    })
      .then((response) => {
        if (response.ok) {
          console.log("Mentorship offer created successfully");
        } else {
          console.error("Failed to create mentorship offer");
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return (
    <div>
      <h1>Request Mentorship</h1>
      <input
        type="text"
        placeholder="Skills required"
        onChange={(e) => setSkillsRequired(e.target.value)}
      />
      <button onClick={handleMentorshipRequest}>Request Mentorship</button>

      <h1>Offer Mentorship</h1>
      <input
        type="text"
        placeholder="Bio (skills and experience)"
        onChange={(e) => setBio(e.target.value)}
      />
      <button onClick={handleMentorshipOffer}>Offer Mentorship</button>
    </div>
  );
}

export default App;
