import React, { useState } from "react";
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
  Box,
  Typography,
} from "../../components";
import {
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { hardcodedData } from "../../hardcodedData";

interface PoolData {
  poolPair: string;
  currentPotValue: string;
  ownedTickets: number;
  totalTickets: number;
  status: string;
}

const FixedTableContainer = styled(TableContainer)({
  height: "calc(100vh - 150px)",
  display: "flex",
  flexDirection: "column",
});

const ScrollableTableBody = styled(TableBody)({
  overflow: "auto",
});

const formatNumber = (num: number): string => {
  return num >= 1000 ? num.toLocaleString() : num.toString();
};

export const Pots: React.FC = () => {
  const navigate = useNavigate();
  const [statusFilter, setStatusFilter] = useState<string>("all");

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

  const handleFilterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setStatusFilter(event.target.value);
  };

  const filteredPoolData = hardcodedData.filter((pool) =>
    statusFilter === "all" ? true : pool.status === statusFilter
  );

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "100vh",
        padding: "20px",
        backgroundColor: "#f5f5f5",
      }}
    >
      <FormControl
        sx={{
          m: 2,
          position: "sticky",
          top: 0,
          zIndex: 1,
          backgroundColor: "#2D2D2D",
          padding: "16px",
          borderRadius: "8px",
          width: "fit-content",
          alignSelf: "center",
        }}
      >
        <RadioGroup
          row
          aria-labelledby="status-filter-label"
          name="status-filter"
          value={statusFilter}
          onChange={handleFilterChange}
        >
          <FormControlLabel
            value="all"
            control={
              <Radio
                sx={{ color: "white", "&.Mui-checked": { color: "white" } }}
              />
            }
            label={<Typography sx={{ color: "white" }}>All</Typography>}
          />
          <FormControlLabel
            value="active"
            control={
              <Radio
                sx={{ color: "white", "&.Mui-checked": { color: "white" } }}
              />
            }
            label={<Typography sx={{ color: "white" }}>Active</Typography>}
          />
          <FormControlLabel
            value="completed"
            control={
              <Radio
                sx={{ color: "white", "&.Mui-checked": { color: "white" } }}
              />
            }
            label={<Typography sx={{ color: "white" }}>Completed</Typography>}
          />
          <FormControlLabel
            value="closed"
            control={
              <Radio
                sx={{ color: "white", "&.Mui-checked": { color: "white" } }}
              />
            }
            label={<Typography sx={{ color: "white" }}>Closed</Typography>}
          />
        </RadioGroup>
      </FormControl>
      <FixedTableContainer component={Paper}>
        <Typography variant="h4" align="center" gutterBottom>
          Pots
        </Typography>
        <Table stickyHeader>
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
          <ScrollableTableBody>
            {filteredPoolData.map((row) => {
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
                  <TableCell align="right">
                    {`${formatNumber(row.ownedTickets)}/${formatNumber(
                      row.totalTickets
                    )}`}
                  </TableCell>
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
          </ScrollableTableBody>
        </Table>
      </FixedTableContainer>
    </Box>
  );
};
