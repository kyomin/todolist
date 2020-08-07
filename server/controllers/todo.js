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
    if(!req.body.description) {             // body에 description이 담겨오지 않으면 flag만 업데이트 하는 것이다.
        todoService.updateTodoFlag(req.params.id, req.body.changeFlagValue)
        .then((result) => {
            res.status(200).json(result);
        })
        .catch((fail) => {
            res.json(fail);
        });
    } else {
        todoService.updateTodoDescription(req.params.id, req.body.description)
        .then((result) => {
            res.status(200).json(result);
        })
        .catch((fail) => {
            res.json(fail);
        });
    }
}

const deleteTodo = (req, res) => {
    todoService.deleteTodo(req.params.id)
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
    updateTodo,
    deleteTodo
};