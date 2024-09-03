import React, { ReactNode } from "react";
import {
  TableContainer as MuiTableContainer,
  TableContainerProps as MuiTableContainerProps,
} from "@mui/material";
import { styled } from "@mui/material/styles";

interface TableContainerProps extends MuiTableContainerProps {
  children: ReactNode;
}

const StyledTableContainer = styled(MuiTableContainer)<TableContainerProps>(
  () => ({})
);

export const TableContainer: React.FC<TableContainerProps> = ({
  children,
  ...props
}) => {
  return <StyledTableContainer {...props}>{children}</StyledTableContainer>;
};
