import React, { useState } from "react";
import { Typography, Button, Box, CryptoIcons } from "../../components";
import { useWindowSize } from "react-use";
import { Confetti } from "../../components/Confetti";
import { useParams } from "react-router-dom";

// Fake function to simulate blockchain call
const fakeCheckWinner = (): Promise<boolean> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(Math.random() < 0.5);
    }, 1000); // Simulate network delay
  });
};

export const Result: React.FC = () => {
  const [isWinner, setIsWinner] = useState<boolean | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleClick = async () => {
    setIsLoading(true);
    const result = await fakeCheckWinner();
    setIsWinner(result);
    setIsLoading(false);
  };

  const { width, height } = useWindowSize();

  const { pairId } = useParams<{ pairId: string }>();

  const [firstToken, secondToken] = pairId?.split("-") || [];

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        padding: "20px",
        backgroundColor: "#f5f5f5",
      }}
    >
      <Typography
        variant="h3"
        sx={{ marginBottom: "20px", fontWeight: "bold" }}
      >
        Have you won?
      </Typography>
      <CryptoIcons firstToken={firstToken} secondToken={secondToken} />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
          marginTop: "30px",
        }}
      >
        <Button
          variant="contained"
          size="large"
          onClick={handleClick}
          sx={{
            backgroundColor: "#4CAF50",
            "&:hover": { backgroundColor: "#45a049" },
            padding: "15px 30px",
            fontSize: "18px",
          }}
        >
          {isLoading ? "Checking..." : "Check if you won"}
        </Button>

        {isWinner !== null && (
          <Box sx={{ marginTop: "30px" }}>
            <Typography
              variant="h4"
              sx={{
                color: isWinner ? "#4CAF50" : "#f44336",
                fontWeight: "bold",
              }}
            >
              {isWinner
                ? `Congratulations! You won ${firstToken}!`
                : "Sorry, you didn't win this time"}
            </Typography>
          </Box>
        )}

        {isWinner === true && (
          <Confetti
            width={width}
            height={height}
            recycle={false}
            numberOfPieces={200}
            gravity={0.3}
          />
        )}
      </Box>
    </Box>
  );
};
