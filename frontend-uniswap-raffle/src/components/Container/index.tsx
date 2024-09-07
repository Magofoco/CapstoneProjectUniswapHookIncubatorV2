import React, { ReactNode } from "react";
import {
  Container as MuiContainer,
  ContainerProps as MuiContainerProps,
} from "@mui/material";
import { styled } from "@mui/material/styles";

interface ContainerProps extends MuiContainerProps {
  children: ReactNode;
}

const StyledContainer = styled(MuiContainer)<ContainerProps>(() => ({}));

export const Container: React.FC<ContainerProps> = ({ children, ...props }) => {
  return <StyledContainer {...props}>{children}</StyledContainer>;
};
