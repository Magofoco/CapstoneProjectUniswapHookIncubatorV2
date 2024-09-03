import { useConnect, useAccount, useDisconnect } from "wagmi";
// import { useAutoConnect } from "../../hooks/useAutoConnect";

export function Web3ConnectButton() {
  const { connect, connectors, error } = useConnect();
  const { isConnecting, isConnected, address } = useAccount();
  const { disconnect } = useDisconnect();

  // useAutoConnect();

  const handleClick = () => {
    if (isConnected) {
      disconnect();
    } else {
      const injectedConnector = connectors.find((x) => x.id === "injected");
      if (injectedConnector) {
        connect({ connector: injectedConnector });
      }
    }
  };

  const buttonText = isConnected
    ? `Disconnect ${address?.slice(0, 6)}...${address?.slice(-4)}`
    : isConnecting
    ? "Connecting..."
    : "Connect to Sepolia";

  return (
    <div>
      <button onClick={handleClick} disabled={isConnecting}>
        {buttonText}
      </button>
      {error && (
        <div style={{ color: "red", marginTop: "10px" }}>{error.message}</div>
      )}
    </div>
  );
}
