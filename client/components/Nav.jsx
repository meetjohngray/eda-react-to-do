import React from 'react'
import { Link, NavLink } from 'react-router-dom'
import { IfAuthenticated, IfNotAuthenticated } from './Authenticated'
import Header from './Header'
import TaskList from './TaskList'
import Footer from './Footer'
import { logOff } from 'authenticare/client'

const Nav = () => {
  return (
    <>
      <div className="filters navbar">
        <ul>
          <IfAuthenticated>
            <li><Link to='#' onClick={logOff}>Log off</Link></li>
          </IfAuthenticated>
          <IfNotAuthenticated>
            <li><Link to='/register'>Register</Link></li>
            <li><NavLink to='/signin'>Sign in</NavLink></li>
          </IfNotAuthenticated>
        </ul>
      </div>

      <Header />
      <IfAuthenticated>
        <TaskList />
        <Footer />
      </IfAuthenticated>
    </>
  )
}

export default Nav
