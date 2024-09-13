import React from "react";
import { AppBar, Toolbar, Typography, Link } from "../../components";
import { Web3ConnectButton } from "../Web3ConnectButton";
import { keyframes } from "@emotion/react";

const shimmer = keyframes`
  0% { background-position: -200% 0; }
  100% { background-position: 200% 0; }
`;

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
          <Link
            href="/"
            sx={{
              color: "inherit",
              textDecoration: "none",
              fontWeight: "bold",
              fontSize: "1.2rem",
              background: "linear-gradient(90deg, #cb64e0, #64b5f6, #cb64e0)",
              backgroundSize: "200% auto",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              animation: `${shimmer} 3s linear infinite`,
              "&:hover": {
                transform: "scale(1.05)",
                transition: "transform 0.2s ease-in-out",
              },
            }}
          >
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
