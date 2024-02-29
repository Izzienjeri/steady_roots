import React, { useState, useEffect } from "react";
import {
  MDBCol,
  MDBContainer,
  MDBRow,
  MDBCard,
  MDBCardBody,
  MDBCardTitle,
  MDBCardText,
  MDBCardImage,
  MDBBtn,
} from "mdb-react-ui-kit";
import CreateProfile from "./CreateProfile";
import EditProfile from "./EditProfile";
import Profile from "./Profile";

const ProfilePage = () => {
  // State to store profile data
  const [profile, setProfile] = useState(null);
  // State to track if profile exists
  const [hasProfile, setHasProfile] = useState(false);

  // Fetch profile data on component mount
  useEffect(() => {
    fetchProfile();
  }, []);

  // Function to fetch profile data
  const fetchProfile = async () => {
    try {
      // Fetch profile data from backend API
      const response = await fetch("http://127.0.0.1:5555/profile", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      });

      if (response.ok) {
        // Extract profile data from response
        const data = await response.json();
        setProfile(data);
        // Update hasProfile state based on whether profile data exists
        setHasProfile(true);
      } else {
        // If no profile data exists, set hasProfile state to false
        setHasProfile(false);
        console.error("Failed to fetch profile");
      }
    } catch (error) {
      console.error("Error fetching profile:", error);
    }
  };

  // Render profile data if available
  return (
    <div className="vh-100" style={{ backgroundColor: "#9de2ff" }}>
      <MDBContainer>
        <MDBRow className="justify-content-center">
          <MDBCol md="9" lg="7" xl="5" className="mt-5">
            <MDBCard style={{ borderRadius: "15px" }}>
              <MDBCardBody className="p-4">
                {/* Conditional rendering based on profile existence */}
                {hasProfile ? (
                  <>
                    {/* Display profile information */}
                    <div className="d-flex text-black">
                      <div className="flex-shrink-0">
                        <MDBCardImage
                          style={{ width: "180px", borderRadius: "10px" }}
                          src={profile.photo_url}
                          alt="Profile Image"
                          fluid
                        />
                      </div>
                      <div className="flex-grow-1 ms-3">
                        <MDBCardTitle>{`${profile.first_name} ${profile.last_name}`}</MDBCardTitle>
                        <MDBCardText>{profile.job_title}</MDBCardText>

                        <div
                          className="d-flex justify-content-start rounded-3 p-2 mb-2"
                          style={{ backgroundColor: "#efefef" }}
                        ></div>
                        <div className="d-flex pt-1">
                          <MDBBtn outline className="me-1 flex-grow-1">
                            Chat
                          </MDBBtn>
                          <MDBBtn className="flex-grow-1">Follow</MDBBtn>
                        </div>
                        {/* Option to edit profile */}
                        <EditProfile />
                      </div>
                    </div>
                  </>
                ) : (
                  // If profile doesn't exist, display CreateProfile component
                  <CreateProfile />
                )}
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </div>
  );
};

export default ProfilePage;
