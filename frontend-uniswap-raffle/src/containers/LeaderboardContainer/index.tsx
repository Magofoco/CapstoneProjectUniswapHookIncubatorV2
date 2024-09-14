import React from "react";
import { Leaderboard, LeaderboardEntry } from "../../controls/Leaderboard";
import { Grid } from "../../components";

const leaderboardData: LeaderboardEntry[] = [
  {
    address: "0x7a58c0be72be218b41c608b7fe7c5bb630736c71",
    amount: 1.5,
    date: "2023-04-15",
    poolType: "ETH-USDC",
  },
  {
    address: "0x3e66b66fd1d0b02fda6c811da9e0547970db2f21",
    amount: 980,
    date: "2023-04-14",
    poolType: "LINK-UNI",
  },
  // ... existing entries ...
  {
    address: "0x9b22a80d5c7b3374a05b446081f97d0a34079e7f",
    amount: 15.75,
    date: "2023-04-20",
    poolType: "WBTC-ETH",
  },
  {
    address: "0x6f46cf5569aefa1acc1009290c8e043747172d89",
    amount: 420,
    date: "2023-04-21",
    poolType: "MATIC-USDT",
  },
  {
    address: "0x90f79bf6eb2c4f870365e785982e1f101e93b906",
    amount: 50.5,
    date: "2023-04-22",
    poolType: "AAVE-DAI",
  },
  {
    address: "0x15d34aaf54267db7d7c367839aaf71a00a2c6a65",
    amount: 1200,
    date: "2023-04-23",
    poolType: "COMP-USDC",
  },
  {
    address: "0x47e179ec197488593b187f80a00eb0da91f1b9d0",
    amount: 7.25,
    date: "2023-04-24",
    poolType: "UNI-MATIC",
  },
  {
    address: "0x8626f6940e2eb28930efb4cef49b2d1f2c9c1199",
    amount: 300,
    date: "2023-04-25",
    poolType: "SNX-ETH",
  },
  {
    address: "0xdd2fd4581271e230360230f9337d5c0430bf44c0",
    amount: 25.5,
    date: "2023-04-26",
    poolType: "MKR-DAI",
  },
  {
    address: "0xbda5747bfd65f08deb54cb465eb87d40e51b197e",
    amount: 800,
    date: "2023-04-27",
    poolType: "YFI-DAI",
  },
  {
    address: "0x1cbd3b2770909d4e10f157cabc84c7264073c9ec",
    amount: 550,
    date: "2023-04-28",
    poolType: "SUSHI-ETH",
  },
  {
    address: "0x71be63f3384f5fb98995898a86b02fb2426c5788",
    amount: 18.75,
    date: "2023-04-29",
    poolType: "BAT-USDC",
  },
  {
    address: "0xfabb0ac9d68b0b445fb7357272ff202c5651694a",
    amount: 320,
    date: "2023-04-30",
    poolType: "CRV-ETH",
  },
  {
    address: "0x1abc7c4c4f1a0f8e3ed1560d4ecdb4e4c2baf89d",
    amount: 42.5,
    date: "2023-05-01",
    poolType: "REN-DAI",
  },
  {
    address: "0x95ad61b0a150d79219dcf64e1e6cc01f0b64c4ce",
    amount: 900,
    date: "2023-05-02",
    poolType: "BAL-USDT",
  },
  {
    address: "0x976ea74026e726554db657fa54763abd0c3a0aa9",
    amount: 6.8,
    date: "2023-05-03",
    poolType: "KNC-USDT",
  },
  {
    address: "0x14dc79964da2c08b23698b3d3cc7ca32193d9955",
    amount: 275,
    date: "2023-05-04",
    poolType: "ZRX-ETH",
  },
  {
    address: "0x23618e81e3f5cdf7f54c3d65f7fbc0abf5b21e8f",
    amount: 33.3,
    date: "2023-05-05",
    poolType: "ENJ-USDC",
  },
  {
    address: "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48",
    amount: 1500,
    date: "2023-05-06",
    poolType: "MANA-ETH",
  },
  {
    address: "0xdac17f958d2ee523a2206206994597c13d831ec7",
    amount: 10.2,
    date: "2023-05-07",
    poolType: "LRC-DAI",
  },
];

export const LeaderboardContainer: React.FC = () => {
  return (
    <Grid>
      <Leaderboard entries={leaderboardData} />
    </Grid>
  );
};
