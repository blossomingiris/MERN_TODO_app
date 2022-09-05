function Header({ toggleTheme, theme }) {
  return (
    <div className='header'>
      <div>
        <h1>TODO</h1>
      </div>
      <div className='header__switch'>
        <div className='header__switch__mode' id={theme}>
          <input
            type='checkbox'
            id='switch'
            onChange={toggleTheme}
            checked={theme === 'dark'}
          />
          <label htmlFor='switch'></label>
        </div>
      </div>
    </div>
  )
}

export default Header
