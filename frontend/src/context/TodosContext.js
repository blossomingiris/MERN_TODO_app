import { useReducer, createContext } from 'react'

export const TodosContext = createContext([[], () => {}])

export const todosReducer = (state, action) => {
  switch (action.type) {
    case 'SET_TODOS':
      return {
        todo: action.payload,
      }

    case 'CREATE_TODO':
      return {
        todo: [action.payload, ...state.todo],
      }

    case 'DELETE_TODO':
      return {
        todo: state.todo.filter((t) => t._id !== action.payload._id),
      }

    case 'UPDATE_TODO': {
      const updatedTodos = state.todo.map((t) => {
        if (t._id === action.payload._id) {
          return { ...t, text: action.payload.text }
        }
        return t
      })
      return {
        ...state,
        todo: updatedTodos,
      }
    }

    default:
      return state
  }
}

export const TodosContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(todosReducer, { todo: null })

  return (
    <TodosContext.Provider value={{ ...state, dispatch }}>
      {children}
    </TodosContext.Provider>
  )
}
