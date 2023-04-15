import { useState } from "react";
import "./App.css";
import { Head } from "@impalajs/react/head";
import { createTheme, ThemeProvider } from "@material-ui/core/styles/index.js";

interface AppProps {
  title: string;
}

const theme = createTheme({
  // define your theme here
});

export const App: React.FC<React.PropsWithChildren<AppProps>> = ({
  children,
  title,
}) => {
  return (
    <ThemeProvider theme={theme}>
      <Head>
        <title>{title}</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="description" content="Miami 311 AI chat" />
      </Head>
      {children}
    </ThemeProvider>
  );
};
