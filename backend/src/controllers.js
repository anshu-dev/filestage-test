const { v4: generateId } = require("uuid");
const database = require("./database");

exports.getTodos = async (req, res) => {
  const { today_date, limit, skip } = req.query;
  try {
    const todos = database.client.db("todos").collection("todos");
    let filter = {};
    if (today_date !== "null") filter = { ...filter, due_date: today_date };

    const response = await todos.find(filter, { limit: 10 }).toArray();
    res.status(200);
    res.json(response);
  } catch (error) {
    res.status(500).send(error);
  }
};

exports.addTodo = async (req, res) => {
  try {
    const { text, dueDate } = req.body;

    if (typeof text !== "string") {
      res.status(400);
      res.json({ message: "invalid 'text' expected string" });
      return;
    }

    const todo = {
      id: generateId(),
      text,
      completed: false,
      due_date: dueDate,
    };

    await database.client.db("todos").collection("todos").insertOne(todo);
    res.status(201);
    res.json(todo);
  } catch (error) {
    res.status(500).send(error);
  }
};

exports.deleteTodo = async (req, res) => {
  try {
    const { id } = req.params;
    await database.client.db("todos").collection("todos").deleteOne({ id });
    res.status(203);
    res.end();
  } catch (error) {
    res.status(500).send(error);
  }
};

exports.updateTodo = async (req, res) => {
  try {
    const { id } = req.params;
    const { completed } = req.body;

    if (typeof completed !== "boolean") {
      res.status(400);
      res.json({ message: "invalid 'completed' expected boolean" });
      return;
    }

    await database.client
      .db("todos")
      .collection("todos")
      .updateOne({ id }, { $set: { completed: completed } });

    res.status(200);
    res.end();
  } catch (error) {
    res.status(500).send(error);
  }
};
