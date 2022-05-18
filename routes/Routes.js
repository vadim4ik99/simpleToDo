const express = require("express");
const router = express.Router();

const {
    createTodo,
    getByIdTodo,
    deleteTodo,
    getAllTodos,
    updateTodo,
} = require("../controlles/controller");

router.get('/', getAllTodos)
router.get('/:Id', getByIdTodo)
router.post('/', createTodo)
router.put('/:Id', updateTodo)
router.delete('/:Id', deleteTodo)

module.exports = router;