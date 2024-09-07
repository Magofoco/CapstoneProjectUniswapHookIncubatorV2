import React from "react";
import { Route, Routes } from "react-router-dom";
import { LeaderboardContainer } from "../LeaderboardContainer";
import { Result } from "../Result";
import { Homepage } from "../Homepage";
import { Pots } from "../../controls/Pots";
import { Tickets } from "../Tickets";

export const Page: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Homepage />} />
      <Route path="/leaderboard" element={<LeaderboardContainer />} />
      <Route path="/pots" element={<Pots />} />
      <Route path="/my-tickets" element={<Tickets />} />
      <Route path="/my-tickets/:pairId" element={<Result />} />
    </Routes>
  );
};
