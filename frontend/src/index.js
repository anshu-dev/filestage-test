import React from "react";
import ReactDOM from "react-dom";
import CssBaseline from "@mui/material/CssBaseline";
import Todos from "./components/Todos";
import { Toaster } from "react-hot-toast";

ReactDOM.render(
  <React.StrictMode>
    <CssBaseline />
    <Todos />
    <Toaster />
  </React.StrictMode>,
  document.getElementById("root")
);
