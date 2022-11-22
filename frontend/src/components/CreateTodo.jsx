import { useState } from 'react'
import { useTodosContext } from '../hooks/useTodosContext'
import { FaCrosshairs } from 'react-icons/fa'

import axios from 'axios'

export function CreateTodo({ theme }) {
  const [data, setData] = useState({ text: '' })
  const { dispatch } = useTodosContext()

  function handleChange(e) {
    setData((data) => ({ ...data, [e.target.name]: e.target.value }))
  }

  //create new todo task
  function handleSubmit(e) {
    e.preventDefault()

    const todo = {
      text: data.text,
    }

    const inputIsNotEmpty = Object.keys(todo).length > 0

    if (inputIsNotEmpty) {
      axios
        .post('/api/todo', data)
        .then((res) => {
          setData({ text: '' })
          dispatch({ type: 'CREATE_TODO', payload: res.data })
        })
        .catch((err) => {
          console.log("Error couldn't create todo item")
          console.log(err.message)
        })
    }
  }

  return (
    <section>
      <div>
        <form onSubmit={handleSubmit} className='app__form' noValidate>
          <input
            className='app__form__input'
            id={theme}
            type='text'
            name='text'
            value={data.text}
            onChange={handleChange}
            placeholder='Enter task..'
          />
          <div className='app__form__icon'>
            <FaCrosshairs />
          </div>
          <button
            className='app__btn app__btn__primary custom'
            type='submit'
            id={theme}
          >
            add
          </button>
        </form>
      </div>
    </section>
  )
}
