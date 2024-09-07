import React from "react";
import { useNavigate } from "react-router-dom";
import LaunchIcon from "@mui/icons-material/Launch";
import {
  CryptoIcons,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Grid,
  Chip,
} from "../../components";

interface PoolData {
  poolPair: string;
  currentPotValue: string;
  ownedTickets: number;
  totalTickets: number;
  status: "active" | "completed" | "closed"; // Add this line
}

const poolData: PoolData[] = [
  {
    poolPair: "USDC-ETH",
    currentPotValue: "$100,000",
    ownedTickets: 10849,
    totalTickets: 100000,
    status: "active", // Add status for each pool
  },
  {
    poolPair: "ETH-DAI",
    currentPotValue: "$75,000",
    ownedTickets: 5432,
    totalTickets: 75000,
    status: "active", // Add status for each pool
  },
  {
    poolPair: "BTC-USDT",
    currentPotValue: "$250,000",
    ownedTickets: 15678,
    totalTickets: 150000,
    status: "active", // Add status for each pool
  },
  {
    poolPair: "LINK-ETH",
    currentPotValue: "$50,000",
    ownedTickets: 3210,
    totalTickets: 50000,
    status: "active", // Add status for each pool
  },
  {
    poolPair: "UNI-USDC",
    currentPotValue: "$30,000",
    ownedTickets: 2100,
    totalTickets: 30000,
    status: "active", // Add status for each pool
  },
  {
    poolPair: "AAVE-ETH",
    currentPotValue: "$40,000",
    ownedTickets: 4567,
    totalTickets: 40000,
    status: "active", // Add status for each pool
  },
];

export const Pots: React.FC = () => {
  const navigate = useNavigate();

  const handleNavigate = (poolPair: string) => {
    navigate(`/my-tickets/${poolPair}`);
  };

  const getChipColor = (status: PoolData["status"]) => {
    const colors: Record<PoolData["status"], "success" | "primary" | "error"> =
      {
        active: "success",
        completed: "primary",
        closed: "error",
      };
    return colors[status];
  };

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Pool Pair</TableCell>
            <TableCell>
              <Grid container alignItems="center" spacing={1}>
                <Grid>Current Pot Value</Grid>
                <Grid>
                  <CryptoIcons firstToken="usd" />
                </Grid>
              </Grid>
            </TableCell>
            <TableCell align="right">Tickets You Own/Total Tickets</TableCell>
            <TableCell align="center">Status</TableCell>
            <TableCell align="center">Have you won?</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {poolData.map((row) => {
            const [firstToken, secondToken] = row.poolPair.split("-");
            return (
              <TableRow key={row.poolPair}>
                <TableCell component="th" scope="row">
                  <Grid container alignItems="center" spacing={1}>
                    <Grid>{row.poolPair}</Grid>
                    <Grid>
                      <CryptoIcons
                        firstToken={firstToken}
                        secondToken={secondToken}
                      />
                    </Grid>
                  </Grid>
                </TableCell>
                <TableCell>{row.currentPotValue}</TableCell>
                <TableCell align="right">{`${row.ownedTickets}/${row.totalTickets}`}</TableCell>
                <TableCell align="center">
                  <Chip
                    label={
                      row.status.charAt(0).toUpperCase() + row.status.slice(1)
                    }
                    color={getChipColor(row.status)}
                  />
                </TableCell>
                <TableCell align="center">
                  <IconButton onClick={() => handleNavigate(row.poolPair)}>
                    <LaunchIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
