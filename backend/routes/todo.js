const express = require('express')
const {
  createTodo,
  getListTodos,
  getTodo,
  deleteTodo,
  updateTodo,
} = require('../controllers/todo')

const router = express.Router()

router.get('/', getListTodos)

router.get('/:id', getTodo)

router.post('/', createTodo)

router.delete('/:id', deleteTodo)

router.put('/:id', updateTodo)

module.exports = router
