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
  Box,
} from "../../components";
import { CryptoIcons } from "../../components/CryptoIcons";

export interface LeaderboardEntry {
  address: string;
  amount: number;
  date: string;
  poolType: string;
}

export interface LeaderboardProps {
  entries: LeaderboardEntry[];
}

export const Leaderboard: React.FC<LeaderboardProps> = ({ entries }) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        padding: "20px",
        backgroundColor: "#f5f5f5",
      }}
    >
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
              <TableCell variant="head">Pool Pair</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {entries.map((entry, index) => {
              const [firstToken, secondToken] = entry.poolType.split("-");

              return (
                <TableRow key={index}>
                  <TableCell>{entry.address}</TableCell>
                  <TableCell align="right">
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "flex-end",
                      }}
                    >
                      <span style={{ marginRight: "4px" }}>{entry.amount}</span>
                      <CryptoIcons firstToken={firstToken} />
                    </div>
                  </TableCell>
                  <TableCell align="right">{entry.date}</TableCell>
                  <TableCell>
                    <CryptoIcons
                      firstToken={firstToken}
                      secondToken={secondToken}
                    />
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};
