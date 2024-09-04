import React, { ReactNode } from "react";
import { Table as MuiTable, TableProps as MuiTableProps } from "@mui/material";
import { styled } from "@mui/material/styles";

interface TableProps extends MuiTableProps {
  children: ReactNode;
}

const StyledTable = styled(MuiTable)<TableProps>(() => ({}));

export const Table: React.FC<TableProps> = ({ children, ...props }) => {
  return <StyledTable {...props}>{children}</StyledTable>;
};
