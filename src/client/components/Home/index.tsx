import React, { ReactNode } from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import { ThemeProvider } from "@material-ui/styles";
import { themeWithCustoms } from "./themes";

interface IProps {
  children: ReactNode;
}

const LayoutRoot = ({ children }: IProps) => {
  return (
    <ThemeProvider theme={themeWithCustoms}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
};

export { LayoutRoot };
