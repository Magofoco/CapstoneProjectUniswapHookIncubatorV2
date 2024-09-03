import React, { ReactNode } from "react";
import {
  TableCell as MuiTableCell,
  TableCellProps as MuiTableCellProps,
} from "@mui/material";
import { styled } from "@mui/material/styles";

interface TableCellProps extends MuiTableCellProps {
  children: ReactNode;
}

const StyledTableCell = styled(MuiTableCell)<TableCellProps>(() => ({}));

export const TableCell: React.FC<TableCellProps> = ({ children, ...props }) => {
  return <StyledTableCell {...props}>{children}</StyledTableCell>;
};
