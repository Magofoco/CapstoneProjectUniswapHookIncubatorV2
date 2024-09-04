import React from "react";
import { Container, Box } from "@mui/material";
import { SwapWidgetComponent } from "../../controls/SwapWidget";

export const Homepage: React.FC = () => {
  return (
    <Container maxWidth="sm">
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="100vh"
      >
        <SwapWidgetComponent />
      </Box>
    </Container>
  );
};
