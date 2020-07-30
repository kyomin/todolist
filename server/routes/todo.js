const express = require('express');
const router = express.Router();
const todoController = require('../controllers/todo');
const { auth } = require('../middleware/auth');

//=======================================
//             Todo Router
//=======================================

router.get('/', auth, todoController.getTodos);
router.post('/', auth, todoController.makeTodo);
router.put('/:id', auth, todoController.updateTodo);

module.exports = router;