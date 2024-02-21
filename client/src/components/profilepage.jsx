import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const ProfilePage = () => {
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProfileData();
  }, []);

  const fetchProfileData = async () => {
    try {
      const response = await fetch("http://127.0.0.1:5555/profiles");
      if (!response.ok) {
        throw new Error("Failed to fetch profile data");
      }
      const data = await response.json();
      setProfileData(data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching profile data:", error);
      setLoading(false);
    }
  };

  return (
    <div>
      <h1>Profile Page</h1>
      {loading ? (
        <p>Loading profile data...</p>
      ) : profileData ? (
        <div>
          <p>First Name: {profileData.first_name}</p>
          <p>Last Name: {profileData.last_name}</p>
          <p>Photo URL: {profileData.photo_url}</p>
          <p>User ID: {profileData.user_id}</p>
        </div>
      ) : (
        <p>No profile data available</p>
      )}

      <Link to="/">Back to Home</Link>
    </div>
  );
};

export default ProfilePage;
