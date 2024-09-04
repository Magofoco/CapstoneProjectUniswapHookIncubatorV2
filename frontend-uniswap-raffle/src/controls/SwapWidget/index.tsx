import React from "react";
import { SwapWidget } from "@uniswap/widgets";
import "@uniswap/widgets/fonts.css";
import { Grid } from "../../components";
import { ethers } from "ethers";
const VITE_INFURA_API_KEY = import.meta.env.VITE_INFURA_API_KEY;

export const SwapWidgetComponent: React.FC = () => {
  const SEPOLIA_RPC_URL = `https://sepolia.infura.io/v3/${VITE_INFURA_API_KEY}`;

  const provider = new ethers.providers.JsonRpcProvider(SEPOLIA_RPC_URL);

  const jsonRpcUrlMap = {
    11155111: SEPOLIA_RPC_URL,
  };

  return (
    <Grid>
      <SwapWidget provider={provider} jsonRpcUrlMap={jsonRpcUrlMap} />
    </Grid>
  );
};
