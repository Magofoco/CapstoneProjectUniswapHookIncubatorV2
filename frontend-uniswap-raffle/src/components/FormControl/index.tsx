import React, { ReactNode } from "react";
import {
  FormControl as MuiFormControl,
  FormControlProps as MuiFormControlProps,
} from "@mui/material";
import { styled } from "@mui/material/styles";

interface FormControlProps extends MuiFormControlProps {
  children: ReactNode;
}

const StyledFormControl = styled(MuiFormControl)<FormControlProps>(() => ({}));

export const FormControl: React.FC<FormControlProps> = ({
  children,
  ...props
}) => {
  return <StyledFormControl {...props}>{children}</StyledFormControl>;
};
