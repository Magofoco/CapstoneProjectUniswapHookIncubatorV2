import React, { ReactNode } from "react";
import {
  CardContent as MuiCardContent,
  CardContentProps as MuiCardContentProps,
} from "@mui/material";
import { styled } from "@mui/material/styles";

interface CardContentProps extends MuiCardContentProps {
  children: ReactNode;
}

const StyledCardContent = styled(MuiCardContent)<CardContentProps>(() => ({}));

export const CardContent: React.FC<CardContentProps> = ({
  children,
  ...props
}) => {
  return <StyledCardContent {...props}>{children}</StyledCardContent>;
};
