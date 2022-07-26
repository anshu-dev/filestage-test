import React, { useState } from "react";
import { Button, Icon, Paper, Box, TextField } from "@mui/material";
import toast from "react-hot-toast";

import { fetchAddTodo, formatDate } from "../utils";
import { useStyles } from "../styles";

const AddTodo = ({ todos, setTodos }) => {
  const classes = useStyles();
  const todaysDate = formatDate();
  const [newTodoText, setNewTodoText] = useState("");
  const [dueDate, setDueDate] = useState(todaysDate);

  const addTodo = async (e) => {
    e.preventDefault();
    try {
      const todoText = newTodoText.trim();
      if (todoText !== "") {
        const res = await fetchAddTodo(todoText, dueDate);
        const todo = await res.json();
        setTodos([todo, ...todos]);
        toast.success("added successfully");
        setNewTodoText("");
        setDueDate(todaysDate);
      } else {
        alert("todo can not be empty!");
      }
    } catch (e) {
      toast.error("error");
    }
  };

  return (
    <Paper className={classes.addTodoContainer}>
      <Box
        display="flex"
        flexDirection="row"
        component="form"
        onSubmit={(e) => addTodo(e)}
      >
        <Box flexGrow={1}>
          <TextField
            label="Todo"
            required
            fullWidth
            value={newTodoText}
            onChange={(event) => setNewTodoText(event.target.value)}
            inputProps={{ "data-testid": "input-text" }}
          />
        </Box>
        <Box className={classes.inputDate}>
          <TextField
            label="DueDate"
            required
            type="date"
            inputProps={{ min: todaysDate, "data-testid": "due-date" }}
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
          />
        </Box>
        <Button
          type="submit"
          className={classes.addTodoButton}
          startIcon={<Icon>add</Icon>}
        >
          Add
        </Button>
      </Box>
    </Paper>
  );
};

export default AddTodo;
