import React, { ReactNode } from "react";
import { Grid2 as MuiGrid, Grid2Props as MuiGridProps } from "@mui/material";
import { styled } from "@mui/material/styles";

interface GridProps extends MuiGridProps {
  children: ReactNode;
}

const StyledGrid = styled(MuiGrid)<GridProps>(() => ({}));

export const Grid: React.FC<GridProps> = ({ children, ...props }) => {
  return <StyledGrid {...props}>{children}</StyledGrid>;
};
