import React from 'react'
import Header from './Header'
// import AddTodo from './AddTodo'
import TaskList from './TaskList'
import Footer from './Footer'

class App extends React.Component {
  componentDidMount() {
  }

  render() {
    return (
      <>
        <Header />
        <TaskList />
        <Footer />
      </>
    )
  }
}

export default App
