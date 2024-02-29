import * as React from "react";
import Box from "@mui/material/Box";
import Link from "@mui/material/Link";
import AppBar from "../modules/components/AppBar";
import Toolbar from "../modules/components/Toolbar";

const rightLink = {
  fontSize: 16,
  color: "common.white",
  ml: 3,
};

function Header2() {
  return (
    <div>
      <AppBar position="fixed">
        <Toolbar sx={{ justifyContent: "center" }}>
          <Link
            variant="h6"
            underline="none"
            color="inherit"
            href="/premium-themes/onepirate/"
            sx={{ fontSize: 32, fontWeight: "bold" }}
          >
            {"Steady Roots 🖤"}
          </Link>
        </Toolbar>
      </AppBar>
      <Toolbar />
    </div>
  );
}

export default Header2;
