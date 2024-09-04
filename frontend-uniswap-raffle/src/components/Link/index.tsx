import React, { ReactNode } from "react";
import { Link as MuiLink, LinkProps as MuiLinkProps } from "@mui/material";
import { styled } from "@mui/material/styles";

interface LinkProps extends MuiLinkProps {
  children: ReactNode;
}

const StyledLink = styled(MuiLink)<LinkProps>(() => ({}));

export const Link: React.FC<LinkProps> = ({ children, ...props }) => {
  return <StyledLink {...props}>{children}</StyledLink>;
};
