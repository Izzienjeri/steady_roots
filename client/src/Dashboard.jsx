import React, { useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Paperbase from "./Paperbase";
import Header from "./Header";
import Navigator from "./Navigator";
import CreatePosts from "./CreatePosts";
import Experience from "./Experience";

function DashBoard() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const handleDrawerToggle = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  return (
    <React.Fragment>
      <Header onDrawerToggle={handleDrawerToggle} />
      <Navigator />
      <Paperbase>
        <Routes>
          <Route path="/createposts" element={<CreatePosts />} />
          <Route path="/experiences" element={<Experience />} />
        </Routes>
      </Paperbase>
    </React.Fragment>
  );
}

export default AdminDashboard;
