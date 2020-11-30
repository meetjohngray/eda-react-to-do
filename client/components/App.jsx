import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'

import Header from './Header'
import Nav from './Nav'
import Register from './Register'
import SignIn from './SignIn'
import TaskList from './TaskList'
import Footer from './Footer'

const App = () => {
  return (
    <Router>
      {/* <Nav /> */}
      {/* <Register /> */}
      <Header />
      {/* <TaskList /> */}
      

      <Route path='/' component={Nav} />
      <Route exact path='/register' component={Register} />
      <Route path='/signin' component={SignIn} />
      <Footer />
    </Router>
  )
}

export default App
