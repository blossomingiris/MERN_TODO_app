import { useTodosContext } from '../hooks/useTodosContext'
import axios from 'axios'

function TodoItem({ data, handleEdit, theme }) {
  const { _id, text } = data
  const { dispatch } = useTodosContext()

  //delete single task
  function handleDelete(e) {
    e.preventDefault()
    axios
      .delete(`/api/todo/${_id}`)
      .then((res) => {
        dispatch({
          type: 'DELETE_TODO',
          payload: res.data,
        })
      })
      .catch((err) => {
        console.log('Failed to delete todo')
        console.log(err.message)
      })
  }

  return (
    <div className='container__content'>
      <div className='container__content__input' id={theme}>
        <p>{text}</p>
      </div>
      <div className='content__btns'>
        <button
          name={_id}
          className='app__btn app__btn__primary '
          id={theme}
          onClick={handleEdit}
        >
          edit
        </button>
        <button
          name={_id}
          className='app__btn app__btn__primary'
          id={theme}
          onClick={handleDelete}
        >
          del
        </button>
      </div>
    </div>
  )
}

export default TodoItem
