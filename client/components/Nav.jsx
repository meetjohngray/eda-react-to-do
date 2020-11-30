import React from 'react'
import { Link } from 'react-router-dom'

import { IfAuthenticated, IfNotAuthenticated } from './Authenticated'

import { logOff } from 'authenticare/client'

export default function Nav () {
  return (
    <>
      <div>
        <IfAuthenticated>
          <Link to='#' onClick={logOff}>Log off</Link>
        </IfAuthenticated>
        <IfNotAuthenticated>
          <Link to='/register'>Register</Link>
          <Link to='/signin'>Sign in</Link>
        </IfNotAuthenticated>
      </div>
    </>
  )
}
