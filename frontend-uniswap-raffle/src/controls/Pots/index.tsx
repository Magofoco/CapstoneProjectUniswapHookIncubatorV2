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
} from "../../components";

interface PoolData {
  poolPair: string;
  currentPotValue: string;
  ownedTickets: number;
  totalTickets: number;
}

const poolData: PoolData[] = [
  {
    poolPair: "USDC-ETH",
    currentPotValue: "$100,000",
    ownedTickets: 10849,
    totalTickets: 100000,
  },
  {
    poolPair: "ETH-DAI",
    currentPotValue: "$75,000",
    ownedTickets: 5432,
    totalTickets: 75000,
  },
  {
    poolPair: "BTC-USDT",
    currentPotValue: "$250,000",
    ownedTickets: 15678,
    totalTickets: 150000,
  },
  {
    poolPair: "LINK-ETH",
    currentPotValue: "$50,000",
    ownedTickets: 3210,
    totalTickets: 50000,
  },
  {
    poolPair: "UNI-USDC",
    currentPotValue: "$30,000",
    ownedTickets: 2100,
    totalTickets: 30000,
  },
  {
    poolPair: "AAVE-ETH",
    currentPotValue: "$40,000",
    ownedTickets: 4567,
    totalTickets: 40000,
  },
];

export const Pots: React.FC = () => {
  const navigate = useNavigate();

  const handleNavigate = (poolPair: string) => {
    navigate(`/my-tickets/${poolPair}`);
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
            <TableCell align="center">Have you won?</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {poolData.map((row) => {
            const [firstToken, secondToken] = row.poolPair.split("-");
            console.log(firstToken, secondToken);
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
