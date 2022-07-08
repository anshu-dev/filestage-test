import { useState, useEffect } from "react";
import { Button, Container, Icon, Typography } from "@mui/material";

import { fetchGetTodos, formatDate } from "../utils";
import { useStyles } from "../styles";
import AddTodo from "./AddTodo";
import Todolist from "./Todolist";

function Todos() {
  const classes = useStyles();
  const todayDate = new Date().toLocaleDateString("en-US");

  const [todos, setTodos] = useState([]);
  // const [todayTodos, setTodayTodos] = useState([]);
  const [show, setShow] = useState(false);

  useEffect(() => {
    const query = show ? formatDate(todayDate) : null;
    fetchGetTodos(query)
      .then((response) => response.json())
      .then((todos) => setTodos(todos));
  }, [setTodos, show]);

  // const handleList = () => {
  //   setShow(!show);
  //   // setTodayTodos(
  //   //   todos.filter((todo) => todo.due_date === formatDate(todayDate))
  //   // );
  // };

  return (
    <Container maxWidth="md">
      <Typography variant="h3" align="center" component="h1" gutterBottom>
        Todos
      </Typography>

      <AddTodo todos={todos} setTodos={setTodos} />

      <Typography variant="h3" align="center" component="h1" gutterBottom>
        <Button
          type="button"
          className={classes.addTodoButton}
          startIcon={<Icon>filter</Icon>}
          onClick={() => setShow(!show)}
        >
          {!show ? "Due Today" : "Todo List"}
        </Button>
      </Typography>

      {todos.length > 0 && <Todolist todos={todos} setTodos={setTodos} />}
    </Container>
  );
}

export default Todos;
