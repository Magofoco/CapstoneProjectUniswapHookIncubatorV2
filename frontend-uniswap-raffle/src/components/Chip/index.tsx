import React from "react";
import { Chip as MuiChip, ChipProps as MuiChipProps } from "@mui/material";
import { styled } from "@mui/material/styles";

type ChipProps = MuiChipProps;

const StyledChip = styled(MuiChip)<ChipProps>(() => ({}));

export const Chip: React.FC<ChipProps> = ({ ...props }) => {
  return <StyledChip {...props} />;
};
