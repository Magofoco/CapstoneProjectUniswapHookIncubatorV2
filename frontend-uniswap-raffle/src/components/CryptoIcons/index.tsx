import React from "react";
import { Grid } from "../Grid";

interface CryptoIcons {
  firstToken: string;
  secondToken?: string;
  size?: number;
}

export const CryptoIcons: React.FC<CryptoIcons> = ({
  firstToken,
  secondToken,
  size = 24,
}) => {
  return (
    <Grid style={{ display: "flex", alignItems: "center" }}>
      {firstToken && (
        <img
          src={`/src/assets/cryptoIcons/color/${firstToken.toLowerCase()}.svg`}
          alt={firstToken}
          width={size}
          height={size}
        />
      )}
      {secondToken && (
        <img
          src={`/src/assets/cryptoIcons/color/${secondToken.toLowerCase()}.svg`}
          alt={secondToken}
          width={size}
          height={size}
          style={{ marginLeft: "-8px" }}
        />
      )}
    </Grid>
  );
};
