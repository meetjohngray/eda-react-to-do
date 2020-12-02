import React from 'react'
import AddTodo from './AddTodo'
import { IfAuthenticated, IfNotAuthenticated } from './Authenticated'

class Header extends React.Component {
  render () {
    return (
      <>
        <header className="header">
          <h1>todos</h1>
          <IfAuthenticated>
            <AddTodo/>
          </IfAuthenticated>
          <IfNotAuthenticated>
          </IfNotAuthenticated>
        </header>
      </>
    )
  }
}

export default Header
