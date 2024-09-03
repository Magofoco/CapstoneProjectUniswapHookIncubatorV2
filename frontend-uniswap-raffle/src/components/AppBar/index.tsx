import React, { ReactNode } from "react";
import {
  AppBar as MuiAppBar,
  AppBarProps as MuiAppBarProps,
} from "@mui/material";
import { styled } from "@mui/material/styles";

interface AppBarProps extends MuiAppBarProps {
  children: ReactNode;
}

const StyledAppBar = styled(MuiAppBar)<AppBarProps>(() => ({}));

export const AppBar: React.FC<AppBarProps> = ({ children, ...props }) => {
  return <StyledAppBar {...props}>{children}</StyledAppBar>;
};
