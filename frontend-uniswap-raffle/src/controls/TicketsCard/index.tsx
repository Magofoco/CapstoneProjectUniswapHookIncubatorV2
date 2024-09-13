import React from "react";
import { Card, CardContent, Typography, Box, Chip } from "../../components";
import { ArrowForward } from "@mui/icons-material"; // Import the arrow icon
import { Stack } from "@mui/material";

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
    <Card
      onClick={onTicketClick}
      sx={{
        cursor: "pointer",
        transition: "0.3s",
        "&:hover": {
          transform: "translateY(-4px)",
          boxShadow: 3,
        },
      }}
    >
      <CardContent>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Typography variant="h6" gutterBottom>
            {poolPair}
          </Typography>
          <ArrowForward color="action" /> {/* Add clickable icon */}
        </Stack>
        <Box mb={2}>
          <Typography variant="body1" fontWeight="bold">
            Your Tickets:{" "}
            <span style={{ color: "primary.main" }}>{ownedTickets}</span>
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Total Tickets: {totalTickets}
          </Typography>
        </Box>
        <Chip
          label={capitalizedStatus}
          color={getChipColor(raffleStatus)}
          size="small"
          sx={{ fontWeight: "bold" }}
        />
      </CardContent>
    </Card>
  );
};
