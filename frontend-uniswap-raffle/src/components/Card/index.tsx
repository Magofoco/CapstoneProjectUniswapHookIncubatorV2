import React, { ReactNode } from "react";
import { Card as MuiCard, CardProps as MuiCardProps } from "@mui/material";
import { styled } from "@mui/material/styles";

interface CardProps extends MuiCardProps {
  children: ReactNode;
}

const StyledCard = styled(MuiCard)<CardProps>(() => ({}));

export const Card: React.FC<CardProps> = ({ children, ...props }) => {
  return <StyledCard {...props}>{children}</StyledCard>;
};
