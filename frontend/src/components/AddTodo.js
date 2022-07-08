import React, { useState } from "react";
import { Button, Icon, Paper, Box, TextField } from "@mui/material";
import { fetchAddTodo, formatDate } from "../utils";
import { useStyles } from "../styles";

function AddTodo({ todos, setTodos }) {
  const classes = useStyles();
  const todayDate = new Date().toLocaleDateString("en-US");
  const [newTodoText, setNewTodoText] = useState("");
  const [dueDate, setDueDate] = useState(formatDate(todayDate));

  function addTodo(text) {
    const todoText = text.trim();
    if (todoText !== "") {
      fetchAddTodo(todoText, dueDate)
        .then((response) => response.json())
        .then((todo) => setTodos([...todos, todo]));
      setNewTodoText("");
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
        onSubmit={() => addTodo(newTodoText)}
      >
        <Box flexGrow={1}>
          <TextField
            label="Todo"
            required
            fullWidth
            value={newTodoText}
            onKeyPress={(event) => {
              if (event.key === "Enter") {
                addTodo(newTodoText);
              }
            }}
            onChange={(event) => setNewTodoText(event.target.value)}
          />
        </Box>
        <TextField
          label="DueDate"
          required
          className={classes.inputDate}
          type="date"
          inputProps={{ min: formatDate(todayDate), max: 10 }}
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
        />
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
}

export default AddTodo;
