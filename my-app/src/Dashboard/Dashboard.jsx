import React, { useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Paperbase2 from "./Paperbase2";
import Header2 from "./Header2";
import Navigator2 from "./Navigator2";
import DynamicContent2 from "./DynamicContent2";

function Dashboard() {
  const [selectedItem, setSelectedItem] = useState(null);

  const handleItemClick = (itemId) => {
    setSelectedItem(itemId);
  };
  return (
    <div style={{ display: "flex" }}>
      <Navigator2 onItemClick={handleItemClick} selectedItem={selectedItem} />
      <DynamicContent2 selectedItem={selectedItem} />
    </div>
  );
}

export default Dashboard;
