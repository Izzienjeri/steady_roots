import React, { useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Paperbase2 from "./Paperbase2";
import Header2 from "./Header2";
import Navigator2 from "./Navigator2";
import Content2 from "./Content2";

function Dashboard() {
  const [selectedItem, setSelectedItem] = useState(null);

  const handleItemClick = (itemId) => {
    setSelectedItem(itemId); // Update selected item state
  };

  return (
    <React.Fragment>
      <Header2 />
      <Navigator2 onItemClick={handleItemClick} />
      <Content2 selectedItem={selectedItem} />
      <Paperbase2></Paperbase2>
    </React.Fragment>
  );
}

export default Dashboard;
