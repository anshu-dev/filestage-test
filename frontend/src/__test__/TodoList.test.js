import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import TodoList from "../components/TodoList";

describe("Tests for TodoList", () => {
  const data = [
    { id: 1, text: "A", due_today: "2022-07-22", completed:true },
    { id: 2, text: "B", due_today: "2022-10-20", completed:false },
    { id: 4, text: "C", due_today: "2022-07-25", completed:false },
  ];
  const length = data.length;
  it("for deleting a todo", () => {
    const doc = render(<TodoList todos={data} />);

    // Click the delete button on the todo.
    const todoDeleteButton = doc.getAllByTestId("deleteButton")[0];
    fireEvent.click(todoDeleteButton);
    data.pop();
    expect(data.length).toBe(length - 1);
  });

  it("for checkbox", () => {
    const doc = render(<TodoList todos={data} />);
    const completedButton = doc.getAllByTestId("checkbox");
    completedButton.forEach((completedButton) => {
        expect(completedButton).toBeInTheDocument();
      })
  });
});