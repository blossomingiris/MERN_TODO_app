import { useState, useEffect } from 'react'
import { useTodosContext } from '../hooks/useTodosContext'
import { FaTimes } from 'react-icons/fa'
import axios from 'axios'
import TodoItem from './TodoItem'
import UpdateTodo from './UpdateTodo'

export function ShowTodoList({ theme }) {
  const { todo, dispatch } = useTodosContext()
  const [open, setOpen] = useState(false)
  const [id, setId] = useState('')

  //show all todos
  useEffect(() => {
    axios
      .get('/api/todo')
      .then((res) => {
        dispatch({ type: 'SET_TODOS', payload: res.data })
      })
      .catch((err) => {
        console.log(err.message)
      })
  }, [dispatch])

  //modal window for edit
  function handleEdit(e) {
    setId(e.target.name)
    setOpen(true)
  }

  function handleUpdate() {
    dispatch(!todo)
  }

  //close modal window
  function handleClose() {
    setId('')
    setOpen(false)
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
            />
          </div>
        </section>
      ) : (
        ''
      )}
    </section>
  )
}
