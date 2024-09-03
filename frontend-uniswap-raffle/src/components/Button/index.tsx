import React, { ReactNode } from "react";
import {
  Button as MuiButton,
  ButtonProps as MuiButtonProps,
  styled,
} from "@mui/material";

interface ButtonProps extends MuiButtonProps {
  children: ReactNode;
}

// Create a styled button component
const StyledButton = styled(MuiButton)({
  backgroundColor: "#9c27b0",
  color: "white",
  padding: "10px 20px",
  borderRadius: "20px",
  "&:hover": {
    backgroundColor: "#7b1fa2",
  },
});

export const Button: React.FC<ButtonProps> = ({ children }) => {
  return <StyledButton variant="contained">{children}</StyledButton>;
};
