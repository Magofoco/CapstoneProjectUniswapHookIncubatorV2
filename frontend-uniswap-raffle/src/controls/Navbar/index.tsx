import React from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Box,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";

export const Navbar: React.FC = () => {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          RaffleShuffle
        </Typography>
        <Box sx={{ display: { xs: "none", sm: "block" } }}>
          <Button color="inherit">Action</Button>
        </Box>
        <IconButton
          size="large"
          edge="end"
          color="inherit"
          aria-label="menu"
          //   sx={{ display: { xs: "block", sm: "none" } }}
        >
          <MenuIcon />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};
