import React from "react";
import { AppBar, Toolbar, Typography, Link } from "../../components";
import { Web3ConnectButton } from "../Web3ConnectButton";

export const Navbar: React.FC = () => {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          <Link href="/" style={{ color: "inherit", textDecoration: "none" }}>
            RaffleShuffleSwap
          </Link>
        </Typography>
        <Web3ConnectButton />
      </Toolbar>
    </AppBar>
  );
};
