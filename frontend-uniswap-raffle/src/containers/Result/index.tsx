import React, { useState } from "react";
import { useReadContract } from "wagmi";
import { Typography, Button, Box } from "../../components";
import { useWindowSize } from "react-use";
import { Abi } from "viem";
import { Confetti } from "../../components/Confetti";

// TODO: Replace with actual contract ABI and address
const CONTRACT_ABI = [] as Abi;
const CONTRACT_ADDRESS = "0x...";

export const Result: React.FC = () => {
  const [isWinner, setIsWinner] = useState<boolean | null>(false);

  const { data, isLoading, refetch } = useReadContract({
    address: CONTRACT_ADDRESS,
    abi: CONTRACT_ABI,
    functionName: "checkWinner", // TODO: Replace with actual function name
    args: [
      /* Add any necessary arguments */
    ],
  });

  const handleClick = async () => {
    await refetch();
    setIsWinner(data as boolean);
  };

  const { width, height } = useWindowSize();

  return (
    <Box>
      <Button
        variant="contained"
        size="large"
        onClick={handleClick}
        disabled={isLoading}
      >
        {isLoading ? "Checking..." : "Check Result"}
      </Button>

      {isWinner === true && (
        <Confetti
          width={width}
          height={height}
          recycle={false}
          numberOfPieces={200}
          gravity={0.3}
        />
      )}

      {isWinner === false && (
        <Box
          sx={{
            position: "absolute",
            bottom: 0,
            width: "100%",
            display: "flex",
            justifyContent: "space-around",
          }}
        >
          {[...Array(5)].map(() => (
            <Typography>😢</Typography>
          ))}
        </Box>
      )}
    </Box>
  );
};
