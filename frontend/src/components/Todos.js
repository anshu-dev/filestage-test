import { useState, useEffect } from "react";
import { Button, Container, Icon, Typography } from "@mui/material";

import { fetchGetTodos, formatDate } from "../utils";
import { useStyles } from "../styles";
import AddTodo from "./AddTodo";
import TodoList from "./TodoList";
import InfinitScroll from "react-infinite-scroll-component";

function Todos() {
  const classes = useStyles();
  const [todos, setTodos] = useState([]);
  const [show, setShow] = useState(false);
  const [skip, setSkip] = useState(0);
  const [scrollLoder, setscrollLoder] = useState(false);

  useEffect(() => {
    let query;
    if (show) query = `?today_date=${formatDate()}`;
    fetchGetTodos(query)
      .then((response) => response.json())
      .then((todos) => setTodos(todos));
  }, [setTodos, show]);

  const fetchNextTodos = () => {
    setscrollLoder(true);
    let temp = skip;
    temp = 20 + temp;
    setSkip(temp);
    const query = `?skip=${temp}`;
    fetchGetTodos(query)
      .then((response) => response.json())
      .then((nextTodos) => setTodos([...todos, ...nextTodos]));
  };

  return (
    <InfinitScroll
      dataLength={todos?.length}
      next={fetchNextTodos}
      hasMore={true}
      style={{ textAlign: "center" }}
      loader={scrollLoder && <div>Loading ... </div>}
    >
      <Container maxWidth="md">
        <Typography variant="h3" align="center" component="h1" gutterBottom>
          Todos
        </Typography>

        <AddTodo todos={todos} setTodos={setTodos} />

        <Typography variant="h3" align="right" component="h1" gutterBottom>
          <Button
            type="button"
            className={classes.addTodoButton}
            startIcon={<Icon>filter</Icon>}
            onClick={() => setShow(!show)}
          >
            {!show ? "Filter by due today" : "All Todos"}
          </Button>
        </Typography>
        {todos.length > 0 && (
          <TodoList show={show} todos={todos} setTodos={setTodos} />
        )}
      </Container>
    </InfinitScroll>
  );
}

export default Todos;
