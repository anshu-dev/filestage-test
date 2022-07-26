import React from "react";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import moment from "moment";
import AddTodo from "../components/AddTodo";

describe("Tests for AddTodo", () => {
  const handleSubmit = jest.fn();
  const date = moment(new Date()).format("YYYY-MM-DD");

  it("when AddTodo component renders", async () => {
    render(<AddTodo />);

    const inputField = screen.getByTestId("input-text");
    fireEvent.change(inputField, { target: { value: "test-todo" } });
    expect(inputField.value).not.toEqual("");

    const dateField = screen.getByTestId("due-date");
    fireEvent.change(dateField, {
      target: { value: date },
    });
    expect(dateField.value).not.toEqual("");

    const addButton = screen.queryByRole("button", { name: "Add" });
    fireEvent.submit(addButton);

    await waitFor(() => expect(handleSubmit).toHaveBeenCalledTimes(0));

  });
});

