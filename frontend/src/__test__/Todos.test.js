import React from "react";
import { render, screen } from "@testing-library/react";
import Todos from "../components/Todos";

describe("Tests for Todos", () => {
  it("when Todos renders", () => {
    render(<Todos />);
  });

  it("for Todos component", () => {
    const doc = render(<Todos />);

    const title = screen.getByRole("heading").textContent;
    expect(title).toEqual("Todos");

    const switchHeadingLeft = screen.getByText("All Todos");
    expect(switchHeadingLeft).toBeInTheDocument();

    const switchHeadingRight = screen.getByText("Due Today");
    expect(switchHeadingRight).toBeInTheDocument();

  });
});