import React, { ReactNode } from "react";
import { Box as MuiBox, BoxProps as MuiBoxProps } from "@mui/material";
import { styled } from "@mui/material/styles";

interface BoxProps extends MuiBoxProps {
  children: ReactNode;
}

const StyledBox = styled(MuiBox)<BoxProps>(() => ({}));

export const Box: React.FC<BoxProps> = ({ children, ...props }) => {
  return <StyledBox {...props}>{children}</StyledBox>;
};
