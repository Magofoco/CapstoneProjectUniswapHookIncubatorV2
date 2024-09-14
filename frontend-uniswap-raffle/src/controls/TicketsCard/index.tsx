import React from "react";
import {
  Card,
  CardContent,
  Typography,
  Box,
  Chip,
  CryptoIcons,
} from "../../components";
import { ArrowForward } from "@mui/icons-material"; // Import the arrow icon
import { Stack } from "@mui/material";

interface TicketsCardProps {
  poolPair: string;
  ownedTickets: number;
  totalTickets: number;
  raffleStatus: "active" | "completed" | "closed";
  onTicketClick: () => void;
}

const formatNumber = (num: number): string => {
  return num >= 1000 ? num.toLocaleString() : num.toString();
};

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

  const [firstToken, secondToken] = poolPair.split("-");

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
          <Stack direction="row" spacing={1} alignItems="center">
            <CryptoIcons firstToken={firstToken} secondToken={secondToken} />
            <Typography variant="h6">{poolPair}</Typography>
          </Stack>
          <ArrowForward color="action" />
        </Stack>
        <Box mb={2}>
          <Typography variant="body1" fontWeight="bold">
            Your Tickets:{" "}
            <span style={{ color: "primary.main" }}>
              {formatNumber(ownedTickets)}
            </span>
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Total Tickets: {formatNumber(totalTickets)}
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
