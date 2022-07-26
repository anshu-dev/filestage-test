const express = require("express");
const controller = require("./controllers.js");
const app = express();

function requestLogger(req, res, next) {
  res.once("finish", () => {
    const log = [req.method, req.path];
    if (req.body && Object.keys(req.body).length > 0) {
      log.push(JSON.stringify(req.body));
    }
    if (req.query && Object.keys(req.query).length > 0) {
      log.push(JSON.stringify(req.query));
    }
    log.push("->", res.statusCode);
    // eslint-disable-next-line no-console
    console.log(log.join(" "));
  });
  next();
}

app.use(requestLogger);
app.use(require('cors')());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get('/', controller.getTodos);
app.post('/', controller.addTodo);
app.put('/:id', controller.updateTodo);
app.delete('/:id', controller.deleteTodo);
app.post('/reorder', controller.reOrderTodo);

module.exports = app;
