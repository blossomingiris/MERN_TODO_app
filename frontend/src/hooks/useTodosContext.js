import { TodosContext } from '../context/TodosContext'
import { useContext } from 'react'

export const useTodosContext = () => {
  const context = useContext(TodosContext)

  if (!context) {
    throw Error('useTodosContext need to be used inside TodosContextProvider')
  }

  return context
}
