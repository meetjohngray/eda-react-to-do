import React from 'react'

import { IfAuthenticated, IfNotAuthenticated } from './Authenticated'

import { logOff } from 'authenticare/client'

export default function Nav () {
  return (
    <>
      <div>
        <IfAuthenticated>
          <a to='#' onClick={logOff}>Log off</a>
        </IfAuthenticated>
        <IfNotAuthenticated>
          <a to='/register'>Register</a>
          <a to='/signin'>Sign in</a>
        </IfNotAuthenticated>
      </div>
    </>
  )
}
