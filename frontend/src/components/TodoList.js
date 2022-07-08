import React, { useRef } from "react";
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
import { useStyles } from "../styles";
import { fetchDeleteTodo, fetchToggleTodoCompleted } from "../utils";

function Todolist({ show, todos, setTodos }) {
  const classes = useStyles();
  const dragItem = useRef();
  const dragOverItem = useRef();

  const dragStart = (e, position) => {
    dragItem.current = position;
  };

  const dragEnter = (e, position) => {
    dragOverItem.current = position;
  };

  const drop = (e) => {
    const copyListItems = [...todos];
    const dragItemContent = copyListItems[dragItem.current];
    copyListItems.splice(dragItem.current, 1);
    copyListItems.splice(dragOverItem.current, 0, dragItemContent);
    dragItem.current = null;
    dragOverItem.current = null;
    setTodos(copyListItems);
  };

  function toggleTodoCompleted(id) {
    fetchToggleTodoCompleted(id, todos).then(() => {
      const newTodos = [...todos];
      const modifiedTodoIndex = newTodos.findIndex((todo) => todo.id === id);
      newTodos[modifiedTodoIndex] = {
        ...newTodos[modifiedTodoIndex],
        completed: !newTodos[modifiedTodoIndex].completed,
      };
      setTodos(newTodos);
    });
  }

  function deleteTodo(id) {
    fetchDeleteTodo(id).then(() =>
      setTodos(todos.filter((todo) => todo.id !== id))
    );
  }
  return (
    <TableContainer component={Paper} className={classes.todosContainer}>
      <Box display="flex" flexDirection="column" alignItems="stretch">
        <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
          <TableHead>
            <Typography variant="h5" align="left" component="div" gutterBottom>
              {show ? "All Todos" : "Filtered By Due Today"}
            </Typography>
            <TableRow>
              <TableCell>Completed</TableCell>
              <TableCell>Text</TableCell>
              <TableCell>Due Date</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {[...todos]
              .reverse()
              .map(({ id, text, completed, due_date }, index) => (
                <TableRow
                  key={id}
                  className={classes.todoContainer}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  onDragStart={(e) => dragStart(e, index)}
                  onDragEnter={(e) => dragEnter(e, index)}
                  onDragEnd={drop}
                  draggable
                >
                  <TableCell>
                    <Checkbox
                      checked={completed}
                      onClick={() => toggleTodoCompleted(id)}
                    ></Checkbox>
                  </TableCell>

                  <TableCell>
                    <Box flexGrow={1}>
                      <Typography
                        className={completed ? classes.todoTextCompleted : ""}
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
                    >
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </Box>
    </TableContainer>
  );
}

export default Todolist;
