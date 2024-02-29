// AdminDashboard.jsx
import React, { useState } from "react";
import Navigator from "./Navigator";
import DynamicContent from "./DynamicContent";

function AdminDashboard() {
  const [selectedItem, setSelectedItem] = useState(null);

  const handleItemClick = (itemId) => {
    setSelectedItem(itemId);
  };

  return (
    <div style={{ display: "flex" }}>
      <Navigator onItemClick={handleItemClick} selectedItem={selectedItem} />
      <DynamicContent selectedItem={selectedItem} />
    </div>
  );
}

export default AdminDashboard;
