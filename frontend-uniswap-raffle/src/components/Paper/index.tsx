import React, { ReactNode } from "react";
import { Paper as MuiPaper, PaperProps as MuiPaperProps } from "@mui/material";
import { styled } from "@mui/material/styles";

interface PaperProps extends MuiPaperProps {
  children: ReactNode;
}

const StyledPaper = styled(MuiPaper)<PaperProps>(() => ({}));

export const Paper: React.FC<PaperProps> = ({ children, ...props }) => {
  return <StyledPaper {...props}>{children}</StyledPaper>;
};
