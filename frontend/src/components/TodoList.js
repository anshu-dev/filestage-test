import React from "react";
import {
  Typography,
  Button,
  Icon,
  Paper,
  Box,
  Checkbox,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from "@mui/material";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import toast from "react-hot-toast";

import { useStyles } from "../styles";
import {
  fetchDeleteTodo,
  fetchGetTodos,
  fetchToggleTodoCompleted,
  reOrderTodo,
} from "../utils";
import Loader from "./Loader";

const Todolist = ({ show, todos, setTodos, loading }) => {
  const classes = useStyles();

  const toggleTodoCompleted = async (id) => {
    try {
      await fetchToggleTodoCompleted(id, todos);
      const newTodos = [...todos];
      const modifiedTodoIndex = newTodos.findIndex((todo) => todo.id === id);
      newTodos[modifiedTodoIndex] = {
        ...newTodos[modifiedTodoIndex],
        completed: !newTodos[modifiedTodoIndex].completed,
      };
      setTodos(newTodos);
      toast.success("updated");
    } catch (e) {
      toast("error");
    }
  };

  const deleteTodo = async (id) => {
    try {
      await fetchDeleteTodo(id);
      setTodos(todos.filter((todo) => todo.id !== id));
      toast.success("deleted successfully");
    } catch (e) {
      toast.error(e);
    }
  };

  const handleEnd = async (result) => {
    if (!result?.destination) return;
    const res = await reOrderTodo({
      si: result.source.index,
      di: result.destination.index,
      sid: result.draggableId,
    });
    if (res) {
      let query;
      const res1 = await fetchGetTodos(query);
      const todolist = await res1.json();
      setTodos(todolist);
    }
    // const newTodos = [...todos];
    // const [reorderedItem] = newTodos.splice(result.source.index, 1);
    // newTodos.splice(result.destination.index, 0, reorderedItem);
    // setTodos(newTodos);
  };

  if (loading) {
    return <Loader />;
  } else {
    return (
      <TableContainer component={Paper} className={classes.todosContainer}>
        <Box display="flex" flexDirection="column" alignItems="stretch">
          <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
            <TableHead>
              <TableRow>
                <TableCell size="medium" align="center" colSpan={12}>
                  {!show ? "All Todos" : "Filtered By Due Today"}
                </TableCell>
              </TableRow>
            </TableHead>
            <TableHead className={classes.root}>
              <TableRow>
                <TableCell>Completed</TableCell>
                <TableCell>Text</TableCell>
                <TableCell>Due Date</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <DragDropContext onDragEnd={handleEnd}>
              <Droppable droppableId="to-dos">
                {(provided) => (
                  <TableBody
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                  >
                    {todos?.map(({ id, text, completed, due_date, index }) => (
                      <Draggable
                        key={id}
                        draggableId={id?.toString()}
                        index={index}
                      >
                        {(provided, snapshot) => (
                          <TableRow
                            key={id}
                            className={classes.todoContainer}
                            sx={{
                              "&:last-child td, &:last-child th": { border: 0 },
                            }}
                            {...provided.draggableProps}
                            ref={provided.innerRef}
                            {...provided.dragHandleProps}
                          >
                            <TableCell>
                              <Checkbox
                                checked={completed}
                                onClick={() => toggleTodoCompleted(id)}
                                data-testid="checkbox"
                              ></Checkbox>
                            </TableCell>

                            <TableCell>
                              <Box flexGrow={1}>
                                <Typography
                                  className={
                                    completed ? classes.todoTextCompleted : ""
                                  }
                                  variant="body1"
                                >
                                  {text}
                                </Typography>
                              </Box>
                            </TableCell>

                            <TableCell>
                              <Box flexGrow={1}>
                                <Typography>{due_date}</Typography>
                              </Box>
                            </TableCell>

                            <TableCell>
                              <Button
                                className={classes.deleteTodo}
                                startIcon={<Icon>delete</Icon>}
                                onClick={() => deleteTodo(id)}
                                data-testid="deleteButton"
                              >
                                Delete
                              </Button>
                            </TableCell>
                          </TableRow>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </TableBody>
                )}
              </Droppable>
            </DragDropContext>
          </Table>
        </Box>
      </TableContainer>
    );
  }
};

export default Todolist;
