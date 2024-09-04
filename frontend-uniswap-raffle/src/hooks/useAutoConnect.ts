import { useConnect } from "wagmi";
import { useEffect } from "react";

export const useAutoConnect = () => {
  const { connect, connectors } = useConnect();

  useEffect(() => {
    const sepoliaConnector = connectors.find((c) => c.id === "injected");
    if (sepoliaConnector) {
      connect({ connector: sepoliaConnector });
    }
  }, [connect, connectors]);
};
