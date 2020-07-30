const todoService = require('../services/todo');

//=======================================
//             Todo Controller
//=======================================

const getTodos = (req, res) => {
    todoService.getTodos(req.user.id)
    .then((success) => {
        res.json(success);
    })
    .catch((fail) => {
        res.json(fail);
    });
}

const makeTodo = (req, res) => {
    todoService.makeTodo(req)
    .then((success) => { 
        res.json(success);
    })
    .catch((fail) => {
        res.json(fail);
    });
}

const updateTodo = (req, res) => {
    todoService.updateTodo(req.params.id)
    .then((result) => {
        res.status(200).json(result);
    })
    .catch((fail) => {
        res.json(fail);
    });
}

module.exports = {
    getTodos,
    makeTodo,
    updateTodo
};