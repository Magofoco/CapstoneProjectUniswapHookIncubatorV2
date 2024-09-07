import React from "react";
import { Container } from "../../components";
import Grid from "@mui/material/Grid2";
import { TicketsCard } from "../../controls/TicketsCard";
import { useNavigate } from "react-router-dom";

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

  const handleTicketClick = (poolPair: string) => {
    navigate(`/my-tickets/${poolPair}`);
  };

  return (
    <Container maxWidth="lg">
      <Grid container spacing={3}>
        {ticketsData.map((ticket, index) => (
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
