import React, { useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Paperbase from "./Paperbase";
import Header from "./Header";
import Navigator from "./Navigator";
import ManageUsers from "./ManageUsers";
import SendEmail from "./SendEmail";
import ApprovePosts from "./ApprovePosts";

function AdminDashboard() {
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
          <Route path="/manageusers" element={<ManageUsers />} />
          <Route path="sendemail" element={<SendEmail />} />
          <Route path="/approveposts" element={<ApprovePosts />} />
        </Routes>
      </Paperbase>
    </React.Fragment>
  );
}

export default AdminDashboard;
