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

module.exports = {
    getTodos,
    makeTodo
};