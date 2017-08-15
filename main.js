const express = require('express');
const mustacheExpress = require('mustache-express');
const bodyParser = require('body-parser');
const expressValidator = require('express-validator');
const application = express();

application.engine('mustache', mustacheExpress());
application.set('views', './views');
application.set('view engine', 'mustache');
application.use(express.static('public'));
application.use(bodyParser.urlencoded());
application.use(expressValidator());

var model = [];

application.get("/", function (request, response) {
  response.render('todo', {model});
});

application.post("/", function (request, response) {
    var newTodo = {};
    newTodo.name = request.body.task;
    newTodo.complete = false;
    newTodo.id = model.length;
    
  model.push(newTodo);
  response.render('todo', {model});
});

application.post("/:id", function (request, response) {
    var todoId = parseInt(request.params.id);
    var todo = model.find(q => q.id === todoId);
    todo.complete = true;
    response.render('todo', {model});
})

application.listen(3000);
