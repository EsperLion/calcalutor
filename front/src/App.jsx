import React from "react";
import { DistancePage } from "./areas/distance-calculator/DistancePage";
import { CssBaseline } from "@material-ui/core";
import { SnackbarProvider } from 'notistack';
function App() {
  return (
    <SnackbarProvider maxSnack={8}>
      <CssBaseline />
      <DistancePage />
    </SnackbarProvider>
  );
}

export default App;
