import React from "react";
import { Card, CardContent, Typography, Box, Chip } from "../../components";

interface TicketsCardProps {
  poolPair: string;
  ownedTickets: number;
  totalTickets: number;
  raffleStatus: "active" | "completed" | "closed";
  onTicketClick: () => void;
}

export const TicketsCard: React.FC<TicketsCardProps> = ({
  poolPair,
  ownedTickets,
  totalTickets,
  raffleStatus,
  onTicketClick,
}) => {
  const getChipColor = (status: TicketsCardProps["raffleStatus"]) => {
    const colors: Record<
      TicketsCardProps["raffleStatus"],
      "success" | "primary" | "error"
    > = {
      active: "success",
      completed: "primary",
      closed: "error",
    };
    return colors[status];
  };

  const capitalizedStatus =
    raffleStatus.charAt(0).toUpperCase() + raffleStatus.slice(1);

  return (
    <Card onClick={onTicketClick} sx={{ cursor: "pointer" }}>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          {poolPair}
        </Typography>
        <Box mb={2}>
          <Typography variant="body1">
            Tickets: {ownedTickets} / {totalTickets}
          </Typography>
        </Box>
        <Chip label={capitalizedStatus} color={getChipColor(raffleStatus)} />
      </CardContent>
    </Card>
  );
};
