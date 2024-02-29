import React, { useState } from "react";
import Header2 from "./Header2"; // Import Header2 component
import Navigator2 from "./Navigator2";
import DynamicContent2 from "./DynamicContent2";

function Dashboard() {
  const [selectedItem, setSelectedItem] = useState(null);

  const handleItemClick = (itemId) => {
    setSelectedItem(itemId);
  };

  return (
    <div>
      <Header2 />
      <div style={{ display: "flex", marginTop: "-24px" }}>
        {" "}
        {/* Adjust margin top */}
        <Navigator2 onItemClick={handleItemClick} selectedItem={selectedItem} />
        <DynamicContent2 selectedItem={selectedItem} />
      </div>
    </div>
  );
}

export default Dashboard;
