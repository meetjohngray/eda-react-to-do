import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'

import Nav from './Nav'
import Register from './Register'
import SignIn from './SignIn'

const App = () => {
  return (
    <Router>
      <Route path='/' component={Nav} />
      <Route exact path='/register' component={Register} />
      <Route path='/signin' component={SignIn} />
    </Router>
  )
}

export default App
