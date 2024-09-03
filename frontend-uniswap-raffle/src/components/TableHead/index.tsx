import React, { ReactNode } from "react";
import {
  TableHead as MuiTableHead,
  TableHeadProps as MuiTableHeadProps,
} from "@mui/material";
import { styled } from "@mui/material/styles";

interface TableHeadProps extends MuiTableHeadProps {
  children: ReactNode;
}

const StyledTableHead = styled(MuiTableHead)<TableHeadProps>(() => ({}));

export const TableHead: React.FC<TableHeadProps> = ({ children, ...props }) => {
  return <StyledTableHead {...props}>{children}</StyledTableHead>;
};
