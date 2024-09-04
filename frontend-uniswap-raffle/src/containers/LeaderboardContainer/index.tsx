import React from "react";
import { Leaderboard, LeaderboardEntry } from "../../controls/Leaderboard";
import { Grid } from "../../components";

const leaderboardData: LeaderboardEntry[] = [
  {
    address: "0x1234...5678",
    amount: 1.5,
    ticker: "ETH",
    date: "2023-04-15",
  },
  {
    address: "0xabcd...efgh",
    amount: 1000,
    ticker: "LINK",
    date: "2023-04-14",
  },
];

export const LeaderboardContainer: React.FC = () => {
  return (
    <Grid>
      <Leaderboard entries={leaderboardData} />
    </Grid>
  );
};
