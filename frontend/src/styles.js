import makeStyles from "@mui/styles/makeStyles";

export const useStyles = makeStyles({
  addTodoContainer: { padding: 10 },
  inputDate: { marginLeft: 25, marginRight: 10, padding: 5 },
  addTodoButton: { marginLeft: 5 },
  todosContainer: { marginTop: 10, padding: 10 },
  todosBox: { marginTop: 10, padding: 10 },
  todoContainer: {
    borderTop: "1px solid #bfbfbf",
    marginTop: 10,
    padding: 5,
    marginBottom: 10,
    "&:first-child": {
      margin: 0,
      borderTop: "none",
    },
    "&:hover": {
      color: "Skyblue",
      "& $deleteTodo": {
        visibility: "visible",
      },
    },
  },
  todoTextCompleted: {
    textDecoration: "line-through",
    color: "black",
  },
  deleteTodo: {
    visibility: "hidden",
  },
});
