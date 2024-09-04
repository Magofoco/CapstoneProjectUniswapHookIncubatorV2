import React from "react";
import { Route, Routes } from "react-router-dom";
import { LeaderboardContainer } from "../LeaderboardContainer";
import { Result } from "../Result";

export const Page: React.FC = () => {
  return (
    <Routes>
      {/* <Route path="/" element={<Homepage />} /> */}
      <Route path="/" element={<LeaderboardContainer />} />
      <Route path="/result" element={<Result />} />
    </Routes>
  );
};
