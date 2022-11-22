import { useState } from 'react'
import { useTodosContext } from '../hooks/useTodosContext'
import { FaCrosshairs, FaCheck } from 'react-icons/fa'
import axios from 'axios'

export function UpdateTodo({ _id, handleClose, handleUpdate, theme }) {
  const [data, setData] = useState({ text: '' })
  const { dispatch } = useTodosContext()

  //take user input when edit todo
  function handleChange(e) {
    setData((data) => ({ ...data, [e.target.name]: e.target.value }))
  }

  // update task
  function handleSubmit(e) {
    e.preventDefault()
    axios
      .put(`/api/todo/${_id}`, data)
      .then((res) => {
        setData({ text: '' })
        dispatch({
          type: 'UPDATE_TODO',
          payload: {
            _id,
            text: data.text,
          },
        })
      })
      .catch((err) => {
        console.log('Failed to update todo')
        console.log(err.message)
      })
  }

  return (
    <form
      className='app__form'
      id={theme}
      onSubmit={(e) => {
        handleSubmit(e)
        handleUpdate()
        handleClose()
      }}
    >
      <input
        type='text'
        name='text'
        className='app__form__input'
        onChange={handleChange}
        id={theme}
      />
      <div className='app__form__icon'>
        <FaCrosshairs />
      </div>
      <button type='submit' className='app__btn app__btn__primary' id={theme}>
        <FaCheck />
      </button>
    </form>
  )
}

export default UpdateTodo
