import React from "react";
import { Leaderboard, LeaderboardEntry } from "../../controls/Leaderboard";
import { Grid } from "../../components";

const leaderboardData: LeaderboardEntry[] = [
  {
    address: "0x1234...5678",
    amount: 1.5,
    date: "2023-04-15",
    poolType: "ETH-USDC",
  },
  {
    address: "0xabcd...efgh",
    amount: 1000,
    date: "2023-04-14",
    poolType: "LINK-UNI",
  },
];

export const LeaderboardContainer: React.FC = () => {
  return (
    <Grid>
      <Leaderboard entries={leaderboardData} />
    </Grid>
  );
};
