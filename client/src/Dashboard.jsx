import React, { useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Paperbase2 from "./Paperbase2";
import Header2 from "./Header2";
import Navigator2 from "./Navigator2";
import CreatePosts from "./CreatePosts";
import Experience from "./Experience";
import Skill from "./Skill";
import Courses from "./courses";

function Dashboard() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const handleDrawerToggle = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  return (
    <React.Fragment>
      <Header2 onDrawerToggle={handleDrawerToggle} />
      <Navigator2 />
      <Paperbase2>
        <Routes>
          <Route path="/createposts" element={<CreatePosts />} />
          <Route path="/experiences" element={<Experience />} />
          <Route path="/courses" element={<Courses/>} />
          <Route path="/skills" element={<Skill/>} />
          
        </Routes>
      </Paperbase2>
    </React.Fragment>
  );
}

export default Dashboard;
