import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { App } from "./App.tsx";
import { theme } from "./components/index.ts";
import { ThemeProvider } from "@mui/material";
import { WagmiProvider, createConfig, http } from "wagmi";
import { sepolia } from "wagmi/chains";
import { injected, metaMask } from "wagmi/connectors";
import "./index.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
// import { Buffer } from "buffer";

const queryClient = new QueryClient();

const config = createConfig({
  chains: [sepolia],
  transports: {
    [sepolia.id]: http(),
  },
  connectors: [metaMask(), injected()],
});

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <ThemeProvider theme={theme}>
            <App />
          </ThemeProvider>
        </BrowserRouter>
      </QueryClientProvider>
    </WagmiProvider>
  </StrictMode>
);
