import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { createContext, useState } from 'react'
import { ShowTodoList } from '../components/ShowTodosList'
import { CreateTodo } from '../components/CreateTodo'
import { BsStars } from 'react-icons/bs'
import './App.scss'
import Header from '../components/Header'

export const ThemeContext = createContext('null')

function App() {
  const [theme, setTheme] = useState('light')

  const toggleTheme = () => {
    setTheme((current) => (current === 'light' ? 'dark' : 'light'))
  }

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <div className='app' id={theme}>
        <div className='app__container' id={theme}>
          <BrowserRouter>
            <div className='app__header'>
              <Header toggleTheme={toggleTheme} theme={theme} />
              <CreateTodo theme={theme} />
            </div>
            <Routes>
              <Route path='/' element={<ShowTodoList theme={theme} index />} />
            </Routes>
          </BrowserRouter>
        </div>
        <div className='app__container__bottom'>
          <a
            href='https://github.com/blossomingiris'
            target='_blank'
            rel='noreferrer'
          >
            <p>
              Created with <BsStars /> by Xenia Rachouti
            </p>{' '}
          </a>
        </div>
      </div>
    </ThemeContext.Provider>
  )
}

export default App
