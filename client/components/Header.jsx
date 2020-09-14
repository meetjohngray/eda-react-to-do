import React from 'react'
import AddTodo from './AddTodo'

class Header extends React.Component {
  render() {
    return (
      <>
        <header className="header">
          <h1>todos</h1>
          <AddTodo/>
        </header>
      </>  
    )
  }
}

export default Header