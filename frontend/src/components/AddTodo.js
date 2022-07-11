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

  function addTodo(e) {
    e.preventDefault();
    const todoText = newTodoText.trim();
    if (todoText !== "") {
      fetchAddTodo(todoText, dueDate)
        .then((response) => {
          if (response.ok) {
            return response.json();
          }
          throw new Error("something went wrong");
        })
        .then((todo) => {
          setTodos([todo, ...todos]);
          toast.success("added successfully");
        })
        .catch((error) => {
          toast.error(error.message);
        });
      setNewTodoText("");
      setDueDate(todaysDate);
    } else {
      alert("canot be empty");
    }
  }

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
          />
        </Box>
        <Box className={classes.inputDate}>
          <TextField
            label="DueDate"
            required
            type="date"
            inputProps={{ min: todaysDate }}
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
