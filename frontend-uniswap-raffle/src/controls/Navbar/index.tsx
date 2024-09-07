import React from "react";
import { AppBar, Toolbar, Typography, Link, Grid } from "../../components";
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
        <Grid container spacing={0.5} sx={{ width: "auto", mr: 2 }}>
          <Grid>
            <Link color="inherit" href="/pots">
              Pots
            </Link>
          </Grid>
          <Grid>
            <Link color="inherit" href="/leaderboard">
              Leaderboard
            </Link>
          </Grid>
          <Grid>
            <Link color="inherit" href="/result">
              Result
            </Link>
          </Grid>
          <Grid>
            <Link color="inherit" href="/my-tickets">
              Tickets
            </Link>
          </Grid>
        </Grid>
        <Web3ConnectButton />
      </Toolbar>
    </AppBar>
  );
};
