import React, { ReactNode } from "react";
import {
  TableBody as MuiTableBody,
  TableBodyProps as MuiTableBodyProps,
} from "@mui/material";
import { styled } from "@mui/material/styles";

interface TableBodyProps extends MuiTableBodyProps {
  children: ReactNode;
}

const StyledTableBody = styled(MuiTableBody)<TableBodyProps>(() => ({}));

export const TableBody: React.FC<TableBodyProps> = ({ children, ...props }) => {
  return <StyledTableBody {...props}>{children}</StyledTableBody>;
};
