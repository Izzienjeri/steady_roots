import React from "react";
import Paperbase from "./Paperbase"; // Import your Paperbase component here
import Header from "./Header"; // Import your Header component here
import Navigator from "./Navigator"; // Import your Navigator component here
import Content from "./Content"; // Import your Content component here

function AdminDashboard() {
  return (
    <React.Fragment>
      <Header />
      <Navigator />
      <Paperbase>
        <Content />
      </Paperbase>
    </React.Fragment>
  );
}

export default AdminDashboard;
