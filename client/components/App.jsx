import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'

import Nav from './Nav'
import Register from './Register'
import SignIn from './SignIn'

const App = () => {
  return (
    <Router>
      <Route exact path='/register' component={Register} />
      <Route path='/signin' component={SignIn} />
      <Route exact path='/' component={Nav} />
    </Router>
  )
}

export default App
