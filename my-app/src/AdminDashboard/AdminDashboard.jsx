import React, { useState } from "react";
import Header from "./Header"; // Import Header2 component
import Navigator from "./Navigator";
import DynamicContent from "./DynamicContent";

function AdminDashboard() {
  const [selectedItem, setSelectedItem] = useState(null);

  const handleItemClick = (itemId) => {
    setSelectedItem(itemId);
  };

  return (
    <div>
      <Header />
      <div style={{ display: "flex", marginTop: "-24px" }}>
        {" "}
        {/* Adjust margin top */}
        <Navigator onItemClick={handleItemClick} selectedItem={selectedItem} />
        <DynamicContent selectedItem={selectedItem} />
      </div>
    </div>
  );
}

export default AdminDashboard;
