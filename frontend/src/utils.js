const BASE_URL = "http://localhost:3001";

export const fetchGetTodos = (query) => {
  return fetch(`${BASE_URL}${query ? query : ""}`);
};

export const fetchAddTodo = (text, dueDate) => {
  const today_date = formatDate();
  return fetch(`${BASE_URL}/`, {
    headers: { Accept: "application/json", "Content-Type": "application/json" },
    method: "POST",
    body: JSON.stringify({ text, dueDate, today_date }),
  });
};

export const reOrderTodo = (data) => {
  const today_date = formatDate();
  return fetch(`${BASE_URL}/reorder`, {
    headers: { Accept: "application/json", "Content-Type": "application/json" },
    method: "POST",
    body: JSON.stringify(data),
  });
};

export const fetchToggleTodoCompleted = (id, todos) => {
  return fetch(`${BASE_URL}/${id}`, {
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
  return fetch(`${BASE_URL}/${id}`, {
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
