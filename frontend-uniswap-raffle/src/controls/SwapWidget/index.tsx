import React, { useEffect, useState } from "react";
import { SwapWidget } from "@uniswap/widgets";
import { Grid } from "../../components";
import { Web3Provider } from "@ethersproject/providers";
import { useAccount } from "wagmi";

declare global {
  interface Window {
    Browser?: {
      T: () => void;
    };
  }
}

const VITE_INFURA_API_KEY = import.meta.env.VITE_INFURA_API_KEY;
const SEPOLIA_RPC_URL = `https://sepolia.infura.io/v3/${VITE_INFURA_API_KEY}`;

export const SwapWidgetComponent: React.FC = () => {
  const [provider, setProvider] = useState<Web3Provider | undefined>();
  const { connector } = useAccount();

  useEffect(() => {
    window.Browser = {
      T: () => {},
    };
  }, []);

  useEffect(() => {
    if (!connector) {
      setProvider(undefined);
      return;
    }

    const getProvider = async () => {
      try {
        const provider = await connector.getProvider();
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        setProvider(new Web3Provider(provider as any));
      } catch (error) {
        console.error("Failed to get provider:", error);
        setProvider(undefined);
      }
    };

    getProvider();
  }, [connector]);

  const jsonRpcUrlMap = {
    11155111: SEPOLIA_RPC_URL,
  };

  return (
    <Grid>
      <SwapWidget
        tokenList={"https://ipfs.io/ipns/tokens.uniswap.org"}
        provider={provider}
        jsonRpcUrlMap={jsonRpcUrlMap}
      />
    </Grid>
  );
};
