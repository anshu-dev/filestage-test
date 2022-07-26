import makeStyles from "@mui/styles/makeStyles";

export const useStyles = makeStyles({
  addTodoContainer: { padding: 10 },
  loader: { width: "20%", margin: "auto" },
  inputDate: { marginLeft: 10, marginRight: 10 },
  addTodoButton: { marginLeft: 5 },
  todosContainer: { marginTop: 10, padding: 10, marginBlockEnd: 20 },
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
  },
  root: {
    "& .MuiTableCell-head": {
      color: "white",
      backgroundColor: "grey",
    },
  },
  todoTextCompleted: {
    textDecoration: "line-through",
    color: "black",
  },
  header: {
    color: "white",
    backgroundColor: "black",
    width: 1000,
  },
});
