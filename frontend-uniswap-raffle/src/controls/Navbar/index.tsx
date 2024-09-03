import React from "react";
import { Toolbar, Typography } from "@mui/material";
import { AppBar } from "../../components";
import { Web3ConnectButton } from "../Web3ConnectButton";

export const Navbar: React.FC = () => {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          RaffleShuffle
        </Typography>
        <Web3ConnectButton />
      </Toolbar>
    </AppBar>
  );
};
