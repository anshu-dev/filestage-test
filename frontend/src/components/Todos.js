import { useState, useEffect } from "react";
import { Container, Icon, Switch, Typography } from "@mui/material";
import toast from "react-hot-toast";

import { fetchGetTodos, formatDate } from "../utils";
import AddTodo from "./AddTodo";
import TodoList from "./TodoList";
import InfinitScroll from "react-infinite-scroll-component";
import Loader from "./Loader";

const Todos = () => {
  const [todos, setTodos] = useState([]);
  const [show, setShow] = useState(false);
  const [skip, setSkip] = useState(0);
  const [scrollLoder, setscrollLoder] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    let query;
    if (show) query = `?today_date=${formatDate()}`;
    fetchGetTodos(query)
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error("something went wrong");
      })
      .then((todos) => {
        setscrollLoder(false);
        setTodos(todos);
        toast.success("success");
        setLoading(false);
      })
      .catch((error) => {
        toast.error(error);
        setLoading(false);
      });
  }, [setTodos, show]);

  const fetchNextTodos = () => {
    setscrollLoder(true);
    let temp = 20 + skip;
    setSkip(temp);
    const query = `?skip=${temp}`;
    fetchGetTodos(query)
      .then((response) => response.json())
      .then((nextTodos) => {
        setscrollLoder(false);
        setTodos([...todos, ...nextTodos]);
      });
  };

  return (
    <InfinitScroll
      id="infinitscroll"
      dataLength={todos?.length}
      next={fetchNextTodos}
      hasMore={true}
      style={{ textAlign: "center" }}
      loader={
        scrollLoder && (
          <div>
            <Loader />
          </div>
        )
      }
    >
      <Container maxWidth="md" id="container">
        <Typography variant="h3" align="center" component="h1" gutterBottom>
          Todos
        </Typography>

        <AddTodo todos={todos} setTodos={setTodos} id="addtodo" />

        <Typography align="right" component="" gutterBottom>
          <label>All Todos</label>
          <Switch checked={show} onChange={() => setShow(!show)} />
          <label>Due Today</label>
        </Typography>

        {todos.length > 0 && (
          <TodoList
            show={show}
            todos={todos}
            setTodos={setTodos}
            loading={loading}
          />
        )}
      </Container>
    </InfinitScroll>
  );
};

export default Todos;
