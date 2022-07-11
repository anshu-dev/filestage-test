const { v4: generateId } = require("uuid");
const database = require("./database");
var logger = require('../log');

exports.getTodos = async (req, res) => {
  const { today_date, skip } = req.query;
  try {
    const todos = database.client.db("todos").collection("todos");
    let filter = {};
    if (today_date) filter = { ...filter, due_date: today_date };
    const response = await todos.find(filter, { limit: 20, skip: skip ? +skip : 0 }).toArray();
    res.status(200);
    res.json(response.reverse());
  } catch (error) {
    logger.error("while feching todos");
    res.status(500).send(error);
  }
};

exports.addTodo = async (req, res) => {
  try {
    const { text, dueDate, today_date } = req.body;
    if (typeof text !== "string") {
      res.status(400);
      logger.warn("invalid 'text' expected string");
      res.json({ message: "invalid 'text' expected string" });
      return;
    }
    if (new Date(dueDate) < new Date(today_date)) {
      res.status(400);
      res.error({ message: "invalid 'date'" });
      return;
    }
    const todo = {
      id: generateId(),
      text,
      completed: false,
      due_date: dueDate,
    };

    const response = await database.client.db("todos").collection("todos").insertOne(todo);
    logger.info("todo has been added", response);
    res.status(201);
    res.json(todo);
  } catch (error) {
    logger.error("error while adding todo", error);
    res.status(500).send(error);
  }
};

exports.deleteTodo = async (req, res) => {
  try {
    const { id } = req.params;
    const response = await database.client.db("todos").collection("todos").deleteOne({ id });
    logger.warn("todo has been deleted", response);
    res.status(203);
    res.end();
  } catch (error) {
    logger.error("error while deleting todo", error);
    res.status(500).send(error);
  }
};

exports.updateTodo = async (req, res) => {
  try {
    const { id } = req.params;
    const { completed } = req.body;

    if (typeof completed !== "boolean") {
      res.status(400);
      logger.error("invalid 'completed' expected boolean");
      res.json({ message: "invalid 'completed' expected boolean" });
      return;
    }

    const response = await database.client
      .db("todos")
      .collection("todos")
      .updateOne({ id }, { $set: { completed: completed } });
    logger.info("todo has been updated", response);
    res.status(200);
    res.end();
  } catch (error) {
    logger.error("error while updating todo", error);
    res.status(500).send(error);
  }
};
