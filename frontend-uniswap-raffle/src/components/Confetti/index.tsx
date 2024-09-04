import ReactConfetti from "react-confetti";

interface ConfettiProps {
  width: number;
  height: number;
  recycle: boolean;
  numberOfPieces: number;
  gravity: number;
}

export const Confetti: React.FC<ConfettiProps> = ({
  width,
  height,
  recycle,
  numberOfPieces,
  gravity,
}) => {
  return (
    <ReactConfetti
      width={width}
      height={height}
      recycle={recycle}
      numberOfPieces={numberOfPieces}
      gravity={gravity}
    />
  );
};
