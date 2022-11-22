const TodoModel = require('../models/todo')

//get all todos
const getListTodos = async (req, res) => {
  const todo = await TodoModel.find()
  res.status(200).json(todo)
}

//get single todo
const getTodo = (req, res) => {
  TodoModel.findById(req.params.id)
    .then((data) => res.json({ message: 'todo found', data: data }))
    .catch((err) =>
      res.status(404).json({ message: 'todo not found', error: err.message })
    )
}

//create task
const createTodo = async (req, res) => {
  const { text } = req.body

  let emptyFields = []

  if (!text) {
    emptyFields.push('text')
  }

  if (emptyFields.length > 0) {
    return res
      .status(400)
      .json({ error: 'Please fill in all fields', emptyFields })
  }

  // add to the database
  try {
    const todo = await TodoModel.create({ text })
    res.status(200).json(todo)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}

//update todo
const updateTodo = (req, res) => {
  TodoModel.findByIdAndUpdate(req.params.id, req.body)
    .then((data) => res.json({ message: 'Todo updated successfully', data }))
    .catch((err) =>
      res
        .status(400)
        .json({ message: 'Failed to update todo', error: err.message })
    )
}

//delete single todo
const deleteTodo = async (req, res) => {
  const { id } = req.params

  const todo = await TodoModel.findOneAndDelete({ _id: id })

  if (!todo) {
    return res.status(400).json({ error: 'No such todo' })
  }

  res.status(200).json(todo)
}

module.exports = {
  createTodo,
  getListTodos,
  getTodo,
  deleteTodo,
  updateTodo,
}
