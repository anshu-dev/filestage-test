import React from "react";
import { render } from "@testing-library/react";
import Loader from "../components/Loader";
import { ThreeDots } from "react-loader-spinner";

describe("Tests for loader", () => {
  it("when loader runs", () => {
    render(
      <Loader>
        <ThreeDots color="#00BFFF" height={40} width={80} />
      </Loader>
    );
  });
});
