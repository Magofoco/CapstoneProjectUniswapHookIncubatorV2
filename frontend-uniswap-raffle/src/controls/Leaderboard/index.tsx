import React from "react";

import {
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "../../components";

export interface LeaderboardEntry {
  address: string;
  amount: number;
  ticker: string;
  date: string;
}

export interface LeaderboardProps {
  entries: LeaderboardEntry[];
}

export const Leaderboard: React.FC<LeaderboardProps> = ({ entries }) => {
  return (
    <TableContainer component={Paper}>
      <Typography variant="h4" align="center" gutterBottom>
        Leaderboard
      </Typography>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell variant="head">Winner Address</TableCell>
            <TableCell variant="head" align="right">
              Amount Won
            </TableCell>
            <TableCell variant="head" align="right">
              Date
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {entries.map((entry, index) => (
            <TableRow key={index}>
              <TableCell>{entry.address}</TableCell>
              <TableCell align="right">{`${entry.amount} ${entry.ticker}`}</TableCell>
              <TableCell align="right">{entry.date}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
