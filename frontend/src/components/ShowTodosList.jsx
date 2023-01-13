import { useState, useEffect } from 'react'
import { useTodosContext } from '../hooks/useTodosContext'
import { FaTimes } from 'react-icons/fa'
import axios from 'axios'
import TodoItem from './TodoItem'
import UpdateTodo from './UpdateTodo'

export function ShowTodoList({ theme }) {
  const { todo, dispatch } = useTodosContext()
  const [open, setOpen] = useState(false)
  const [singleTodo, setSingleTodo] = useState({})
  const [id, setId] = useState('')

  //get all todos
  useEffect(() => {
    axios
      .get('/api/todo')
      .then((res) => {
        dispatch({ type: 'SET_TODOS', payload: res.data })
      })
      .catch((err) => {
        console.log(err)
      })
  }, [])

  //get single todo
  const getTodo = (todoId) => {
    axios
      .get(`/api/todo/${todoId}`)
      .then((data) => setSingleTodo(data.data.data))
      .catch((err) => {
        console.log(err)
      })
  }

  //modal window for edit todo
  function handleEdit(e) {
    setId(e.target.name)
    setOpen(true)
    getTodo(e.target.name)
  }

  function handleUpdate() {
    dispatch(!todo)
  }

  //close modal window for edit todo
  function handleClose() {
    setId('')
    setOpen(false)
    setSingleTodo({})
  }

  return (
    <section>
      <div>
        {todo &&
          todo.map((data) => (
            <TodoItem
              data={data}
              key={data._id}
              handleEdit={handleEdit}
              theme={theme}
            />
          ))}
      </div>
      {open ? (
        <section className='update__container' id={theme}>
          <div className='update__container__contents' id={theme}>
            <div className='update__container__header' id={theme}>
              <div>
                {' '}
                <p>Start edit task</p>
              </div>
              <div>
                {' '}
                <p onClick={handleClose} className='close'>
                  <FaTimes />
                </p>
              </div>
            </div>

            <UpdateTodo
              _id={id}
              handleClose={handleClose}
              handleUpdate={handleUpdate}
              theme={theme}
              singleTodo={singleTodo}
            />
          </div>
        </section>
      ) : (
        ''
      )}
    </section>
  )
}
