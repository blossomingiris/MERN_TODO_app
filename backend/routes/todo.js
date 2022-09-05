const express = require('express')
const {
  createTodo,
  getListTodos,
  getTodo,
  deleteTodo,
  updateTodo,
  deleteListTodos,
} = require('../controllers/todo')

const router = express.Router()

router.get('/', getListTodos)

router.get('/:id', getTodo)

router.post('/', createTodo)

router.delete('/', deleteListTodos)

router.delete('/:id', deleteTodo)

router.put('/:id', updateTodo)

module.exports = router
