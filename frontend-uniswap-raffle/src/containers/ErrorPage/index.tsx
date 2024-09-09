import React from "react";
import { useNavigate } from "react-router-dom";
import { Box, Typography, Button } from "../../components";

export const ErrorPage: React.FC = () => {
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate("/");
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
        padding: 3,
      }}
    >
      <Typography variant="h4" gutterBottom>
        Oops! Something went wrong.
      </Typography>
      <Typography variant="body1" gutterBottom>
        We're sorry, but an error has occurred.
      </Typography>
      <Button variant="contained" onClick={handleGoHome} sx={{ mt: 2 }}>
        Go back home
      </Button>
    </Box>
  );
};
