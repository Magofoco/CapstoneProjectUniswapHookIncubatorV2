import React, { ReactNode } from "react";
import { Grid2 as MuiGrid, Grid2Props as MuiGridProps } from "@mui/material";

interface GridProps extends MuiGridProps {
  children: ReactNode;
}

export const Grid: React.FC<GridProps> = ({ children, ...props }) => {
  return <MuiGrid {...props}>{children}</MuiGrid>;
};
