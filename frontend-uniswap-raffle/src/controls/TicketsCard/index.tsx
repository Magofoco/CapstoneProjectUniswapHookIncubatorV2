import React from "react";
import { Card, CardContent, Typography, Box, Badge } from "../../components";

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
  const getBadgeColor = (status: string) => {
    switch (status) {
      case "active":
        return "success";
      case "completed":
        return "primary";
      case "closed":
        return "error";
      default:
        return "default";
    }
  };

  return (
    <Card>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          {poolPair}
        </Typography>
        <Box mb={2} display="flex" alignItems="center">
          <Typography
            variant="body1"
            sx={{ ml: 1, cursor: "pointer" }}
            onClick={onTicketClick}
          >
            Tickets: {ownedTickets} / {totalTickets}
          </Typography>
        </Box>
        <Badge
          badgeContent={
            raffleStatus.charAt(0).toUpperCase() + raffleStatus.slice(1)
          }
          color={getBadgeColor(raffleStatus)}
          children={undefined}
        />
      </CardContent>
    </Card>
  );
};
