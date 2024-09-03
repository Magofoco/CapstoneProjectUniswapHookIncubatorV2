import React, { ReactNode } from "react";
import {
  Toolbar as MuiToolbar,
  ToolbarProps as MuiToolbarProps,
} from "@mui/material";
import { styled } from "@mui/material/styles";

interface ToolbarProps extends MuiToolbarProps {
  children: ReactNode;
}

const StyledToolbar = styled(MuiToolbar)<ToolbarProps>(() => ({}));

export const Toolbar: React.FC<ToolbarProps> = ({ children, ...props }) => {
  return <StyledToolbar {...props}>{children}</StyledToolbar>;
};
