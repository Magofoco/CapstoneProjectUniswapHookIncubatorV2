import React, { ReactNode } from "react";
import {
  Typography as MuiTypography,
  TypographyProps as MuiTypographyProps,
} from "@mui/material";
import { styled } from "@mui/material/styles";

interface TypographyProps extends MuiTypographyProps {
  children: ReactNode;
}

const StyledTypography = styled(MuiTypography)<TypographyProps>(() => ({}));

export const Typography: React.FC<TypographyProps> = ({
  children,
  ...props
}) => {
  return <StyledTypography {...props}>{children}</StyledTypography>;
};
