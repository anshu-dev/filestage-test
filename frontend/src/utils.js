const url = "http://localhost:3001";

export const fetchGetTodos = (query) => {
  return fetch(`${url}${query ? query : ""}`);
};

export const fetchAddTodo = (text, dueDate) => {
  return fetch(`${url}/`, {
    headers: { Accept: "application/json", "Content-Type": "application/json" },
    method: "POST",
    body: JSON.stringify({ text, dueDate }),
  });
};

export const fetchToggleTodoCompleted = (id, todos) => {
  return fetch(`${url}/${id}`, {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    method: "PUT",
    body: JSON.stringify({
      completed: !todos.find((todo) => todo.id === id).completed,
    }),
  });
};

export const fetchDeleteTodo = (id) => {
  return fetch(`${url}/${id}`, {
    method: "DELETE",
  });
};

export const formatDate = () => {
  var d = new Date(),
    month = "" + (d.getMonth() + 1),
    day = "" + d.getDate(),
    year = d.getFullYear();

  if (month.length < 2) {
    month = "0" + month;
  }
  if (day.length < 2) {
    day = "0" + day;
  }

  return [year, month, day].join("-");
};
