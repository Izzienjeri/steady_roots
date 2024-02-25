import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import withRoot from "./modules/withRoot";

const Root = withRoot(App);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Root />
  </React.StrictMode>
);
