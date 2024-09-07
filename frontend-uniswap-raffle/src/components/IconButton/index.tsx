import React, { ReactNode } from "react";
import {
  IconButton as MuiIconButton,
  IconButtonProps as MuiIconButtonProps,
} from "@mui/material";
import { styled } from "@mui/material/styles";

interface IconButtonProps extends MuiIconButtonProps {
  children: ReactNode;
}

const StyledIconButton = styled(MuiIconButton)<IconButtonProps>(() => ({}));

export const IconButton: React.FC<IconButtonProps> = ({
  children,
  ...props
}) => {
  return <StyledIconButton {...props}>{children}</StyledIconButton>;
};
