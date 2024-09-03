import React, { ReactNode } from "react";
import {
  TableRow as MuiTableRow,
  TableRowProps as MuiTableRowProps,
} from "@mui/material";
import { styled } from "@mui/material/styles";

interface TableRowProps extends MuiTableRowProps {
  children: ReactNode;
}

const StyledTableRow = styled(MuiTableRow)<TableRowProps>(() => ({}));

export const TableRow: React.FC<TableRowProps> = ({ children, ...props }) => {
  return <StyledTableRow {...props}>{children}</StyledTableRow>;
};
