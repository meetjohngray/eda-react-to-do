import React from 'react'
import { Link } from 'react-router-dom'
import { IfAuthenticated, IfNotAuthenticated } from './Authenticated'
import Header from './Header'
import TaskList from './TaskList'
import Footer from './Footer'
import { logOff } from 'authenticare/client'

export default function Nav () {
  return (
    <>
      <div className="filters navbar">
        <ul>
          <IfAuthenticated>
            <li><Link to='#' onClick={logOff}>Log off</Link></li>
          </IfAuthenticated>
          <IfNotAuthenticated>
            <li><Link to='/register'>Register</Link></li>
            <li><Link to='/signin'>Sign in</Link></li>
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
