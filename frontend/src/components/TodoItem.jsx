import { useTodosContext } from '../hooks/useTodosContext'

function TodoItem({ data, handleEdit, theme }) {
  const { _id, text } = data
  const { dispatch } = useTodosContext()

  //delete todo
  const handleDelete = async () => {
    const response = await fetch(`http://localhost:4000/api/todo/${_id}`, {
      method: 'DELETE',
    })
    const json = await response.json()
    if (response.ok) {
      dispatch({ type: 'DELETE_TODO', payload: json })
    }
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
