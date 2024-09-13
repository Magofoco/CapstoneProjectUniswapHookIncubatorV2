import React from "react";
import { AppBar, Toolbar, Typography, Link } from "../../components";
import { Web3ConnectButton } from "../Web3ConnectButton";

const navLinks = [
  { href: "/pots", label: "Pots" },
  { href: "/leaderboard", label: "Leaderboard" },
  { href: "/my-tickets", label: "My Tickets" },
];

export const Navbar: React.FC = () => {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          <Link href="/" style={{ color: "inherit", textDecoration: "none" }}>
            RaffleShuffleSwap
          </Link>
        </Typography>
        {navLinks.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            sx={{
              color: "#cb64e0",
              px: 2,
              py: 1,
              mx: 1,
              borderRadius: 1,
              textDecoration: "none",
              "&:hover": {
                backgroundColor: "rgba(255, 255, 255, 0.1)",
                cursor: "pointer",
              },
            }}
          >
            <Typography variant="h6" component="div">
              {link.label}
            </Typography>
          </Link>
        ))}
        <Web3ConnectButton />
      </Toolbar>
    </AppBar>
  );
};
