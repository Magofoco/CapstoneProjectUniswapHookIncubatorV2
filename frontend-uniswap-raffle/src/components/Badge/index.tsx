import React, { ReactNode } from "react";
import { Badge as MuiBadge, BadgeProps as MuiBadgeProps } from "@mui/material";
import { styled } from "@mui/material/styles";

interface BadgeProps extends MuiBadgeProps {
  children: ReactNode;
}

const StyledBadge = styled(MuiBadge)<BadgeProps>(() => ({}));

export const Badge: React.FC<BadgeProps> = ({ children, ...props }) => {
  return <StyledBadge {...props}>{children}</StyledBadge>;
};
