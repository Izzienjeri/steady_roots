import React, { useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Paperbase from "./Paperbase";
import Header from "./Header";
import Navigator from "./Navigator";
import Content from "./Content";
// import ManageUsers from "./ManageUsers";
// import SendEmail from "./SendEmail";
// import ApprovePosts from "./ApprovePosts";
// import CreateEvents from "./CreateEvent";

function AdminDashboard() {
  const [selectedItem, setSelectedItem] = useState(null);

  const handleItemClick = (itemId) => {
    setSelectedItem(itemId);
  };

  return (
    <React.Fragment>
      <Header />
      <Navigator onItemClick={handleItemClick} />
      <Content selectedItem={selectedItem} />
      <Paperbase></Paperbase>
    </React.Fragment>
  );
}

export default AdminDashboard;
