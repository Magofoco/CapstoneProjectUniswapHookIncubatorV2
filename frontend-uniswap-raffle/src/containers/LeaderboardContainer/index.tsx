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
    amount: 980,
    date: "2023-04-14",
    poolType: "LINK-UNI",
  },
  {
    address: "0x9876...5432",
    amount: 5.75,
    date: "2023-04-16",
    poolType: "UNI-ETH",
  },
  {
    address: "0xfedc...ba98",
    amount: 250,
    date: "2023-04-13",
    poolType: "DAI-USDT",
  },
  {
    address: "0x2468...1357",
    amount: 10.25,
    date: "2023-04-17",
    poolType: "AAVE-COMP",
  },
  {
    address: "0x1357...2468",
    amount: 500,
    date: "2023-04-12",
    poolType: "YFI-SUSHI",
  },
  {
    address: "0xaaaa...bbbb",
    amount: 3.33,
    date: "2023-04-18",
    poolType: "UNI-ETH",
  },
  {
    address: "0xcccc...dddd",
    amount: 750,
    date: "2023-04-11",
    poolType: "SNX-CRV",
  },
  {
    address: "0xeeee...ffff",
    amount: 8.8,
    date: "2023-04-19",
    poolType: "MKR-REN",
  },
  {
    address: "0x1111...2222",
    amount: 100,
    date: "2023-04-10",
    poolType: "BAL-LRC",
  },
];

export const LeaderboardContainer: React.FC = () => {
  return (
    <Grid>
      <Leaderboard entries={leaderboardData} />
    </Grid>
  );
};
