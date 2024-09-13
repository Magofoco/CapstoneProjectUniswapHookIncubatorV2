import React, { useState } from "react";
import { Container } from "../../components";
import Grid from "@mui/material/Grid2";
import { TicketsCard } from "../../controls/TicketsCard";
import { useNavigate } from "react-router-dom";
import {
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
  Box,
} from "@mui/material";

const ticketsData = [
  {
    poolPair: "ETH-USDT",
    ownedTickets: 5,
    totalTickets: 100,
    raffleStatus: "active",
  },
  {
    poolPair: "BTC-USDC",
    ownedTickets: 2,
    totalTickets: 50,
    raffleStatus: "completed",
  },
  {
    poolPair: "DOT-BNB",
    ownedTickets: 0,
    totalTickets: 75,
    raffleStatus: "closed",
  },
  {
    poolPair: "ADA-USDT",
    ownedTickets: 8,
    totalTickets: 150,
    raffleStatus: "active",
  },
  {
    poolPair: "SOL-BUSD",
    ownedTickets: 3,
    totalTickets: 80,
    raffleStatus: "active",
  },
  {
    poolPair: "LINK-ETH",
    ownedTickets: 1,
    totalTickets: 60,
    raffleStatus: "completed",
  },
  {
    poolPair: "XRP-USDC",
    ownedTickets: 0,
    totalTickets: 120,
    raffleStatus: "closed",
  },
];

export const Tickets: React.FC = () => {
  const navigate = useNavigate();
  const [statusFilter, setStatusFilter] = useState<string>("all");

  const handleTicketClick = (poolPair: string) => {
    navigate(`/my-tickets/${poolPair}`);
  };

  const handleFilterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setStatusFilter(event.target.value);
  };

  const filteredTicketsData = ticketsData.filter((ticket) =>
    statusFilter === "all" ? true : ticket.raffleStatus === statusFilter
  );

  return (
    <Container maxWidth="lg">
      <Box
        sx={{
          my: 5,
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
        <FormControl component="fieldset">
          <RadioGroup
            row
            aria-label="status-filter"
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
              label="All"
              sx={{ color: "white" }}
            />
            <FormControlLabel
              value="active"
              control={
                <Radio
                  sx={{ color: "white", "&.Mui-checked": { color: "white" } }}
                />
              }
              label="Active"
              sx={{ color: "white" }}
            />
            <FormControlLabel
              value="completed"
              control={
                <Radio
                  sx={{ color: "white", "&.Mui-checked": { color: "white" } }}
                />
              }
              label="Completed"
              sx={{ color: "white" }}
            />
            <FormControlLabel
              value="closed"
              control={
                <Radio
                  sx={{ color: "white", "&.Mui-checked": { color: "white" } }}
                />
              }
              label="Closed"
              sx={{ color: "white" }}
            />
          </RadioGroup>
        </FormControl>
      </Box>
      <Grid container spacing={3}>
        {filteredTicketsData.map((ticket, index) => (
          <Grid size={{ xs: 12, sm: 6, md: 3 }} key={index}>
            <TicketsCard
              poolPair={ticket.poolPair}
              ownedTickets={ticket.ownedTickets}
              totalTickets={ticket.totalTickets}
              raffleStatus={
                ticket.raffleStatus as "active" | "completed" | "closed"
              }
              onTicketClick={() => handleTicketClick(ticket.poolPair)}
            />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};
