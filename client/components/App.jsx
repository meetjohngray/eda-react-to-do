import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

import Nav from './Nav'
import Register from './Register'
import SignIn from './SignIn'

const App = () => {
  return (
    <Router>
      <Switch>
        <Route path='/register' component={Register} />
        <Route path='/signin' component={SignIn} />
        <Route exact path='/' component={Nav} />
        <Route render={() => <h1>You've Come to the Wrong Place </h1>}/>
      </Switch>
    </Router>
  )
}

export default App
