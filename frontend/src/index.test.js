import React from "react";
import { render } from "@testing-library/react";
import Todos from "./components/Todos";
import { CssBaseline } from "@mui/material";
import { Toaster } from "react-hot-toast";

describe("Tests", () => {
  it("when index component renders", () => {
    render(
      <>
        <CssBaseline />
        <Todos />
        <Toaster />
      </>
    );
  });
});
