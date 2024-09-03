import React from "react";
import { Toolbar, Typography } from "@mui/material";
import { Button, AppBar } from "../../components";

export const Navbar: React.FC = () => {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          RaffleShuffle
        </Typography>
        <Button>Connect wallet</Button>
      </Toolbar>
    </AppBar>
  );
};
